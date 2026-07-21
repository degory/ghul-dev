import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { createHighlighter } from 'shiki'
import { FALLBACK_VERSIONS, fetchLatestStable } from './nuget-versions'

const ghulInlineHighlighter = await createHighlighter({
  themes: ['light-plus', 'dark-plus'],
  langs: [
    JSON.parse(
      readFileSync(
        fileURLToPath(new URL('./ghul.tmLanguage.json', import.meta.url)),
        'utf-8',
      ),
    ),
    'shell',
    'xml',
  ],
})

// ghūl syntax highlighting uses the same TextMate grammar as the VS Code
// extension, vendored from ghul-vsce/syntaxes/ghul.tmLanguage.json.
const ghulGrammar = JSON.parse(
  readFileSync(fileURLToPath(new URL('./ghul.tmLanguage.json', import.meta.url)), 'utf-8'),
)

// example-data/*.json artifacts carry plain `code`; the <GhulExample>
// component needs it syntax-coloured. Rather than ship Shiki to the client,
// this Vite plugin tokenises each artifact's code at build time, with the
// ghūl grammar and the same VS Code Light+/Dark+ themes VitePress uses for
// fenced code, and folds a `tokens` field into the imported JSON.
let highlighterPromise: ReturnType<typeof createHighlighter> | null = null

function getGhulHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['light-plus', 'dark-plus'],
      langs: [ghulGrammar],
    })
  }
  return highlighterPromise
}

function ghulExampleDataPlugin() {
  return {
    name: 'ghul-example-data',
    enforce: 'pre' as const,
    async transform(source: string, id: string) {
      const path = id.split('?')[0]
      if (!path.endsWith('.json') || !path.includes('/example-data/')) {
        return null
      }

      const data = JSON.parse(source)
      const highlighter = await getGhulHighlighter()

      // defaultColor:false gives each token an htmlStyle of
      // { '--shiki-light': '#..', '--shiki-dark': '#..' } — the component's
      // CSS maps those custom properties to `color` per light/dark mode.
      const tokenise = (text: string) => {
        const { tokens } = highlighter.codeToTokens(text, {
          lang: 'ghul',
          themes: { light: 'light-plus', dark: 'dark-plus' },
          defaultColor: false,
        })
        return tokens.map(line =>
          line.map(token => ({ text: token.content, style: token.htmlStyle ?? {} })),
        )
      }

      // The code is multi-line. A hover's `signature` is itself ghūl and is
      // coloured the same way the VSCE renders it in the hover code block —
      // and it can span several lines (a narrowed variable's hover carries
      // its declared type and, beneath, its narrowed type), so every line is
      // tokenised. `kindLabel` is the plain classifier shown in italics
      // beneath the block. Older artifacts without the signature/kindLabel
      // split fall back to the flat `text`.
      data.tokens = tokenise(data.code)
      data.hovers = (data.hovers ?? []).map(hover => ({
        ...hover,
        signatureLines: tokenise(hover.signature ?? hover.text ?? ''),
      }))

      return { code: JSON.stringify(data), map: null }
    },
  }
}

// Each <GhulExample name="x" /> used to read its data from a folder-wide
// eager glob in the component, so every page bundled all ~220 examples'
// artifacts. This plugin instead gives each page a `<script setup>` that
// statically imports only the examples it uses and passes each one to the
// component as a prop. Vite then puts an example's artifact in the chunk of
// the one page it appears on, and the value is still present at prerender
// so the example stays in the static HTML.
function ghulExamplePagePlugin() {
  return {
    name: 'ghul-example-page-split',
    enforce: 'pre' as const,
    transform(src: string, id: string) {
      if (!id.split('?')[0].endsWith('.md')) return null

      const names: string[] = []
      for (const m of src.matchAll(/<GhulExample\s+name="([^"]+)"/g)) {
        if (!names.includes(m[1])) names.push(m[1])
      }
      if (names.length === 0) return null

      const imports = names
        .map((name, i) => `import __ghulExample${i} from './.vitepress/example-data/${name}.json'`)
        .join('\n')
      const entries = names
        .map((name, i) => `  ${JSON.stringify(name)}: __ghulExample${i},`)
        .join('\n')
      const script = `<script setup>\n${imports}\nconst __ghulExamples = {\n${entries}\n}\n</script>\n\n`

      // single-quote the key: the binding sits inside a double-quoted attribute
      const body = src.replace(
        /<GhulExample\s+name="([^"]+)"/g,
        (tag, name) => `${tag} :data="__ghulExamples['${name}']"`,
      )

      // a `<script setup>` must follow any frontmatter, not precede it
      const frontmatter = /^---\r?\n[\s\S]*?\r?\n---\r?\n/.exec(body)
      const at = frontmatter ? frontmatter[0].length : 0
      return { code: body.slice(0, at) + '\n' + script + body.slice(at), map: null }
    },
  }
}

// Install instructions spell a package version as the placeholder
// `0.0.0-latest.<package id>` rather than a literal. The placeholder is
// shaped like a version, so it survives syntax highlighting as a single
// token and can be substituted in the rendered code block.
const LATEST_VERSION_PLACEHOLDER = /0\.0\.0-latest\.([a-z][a-z0-9.-]*)/g

const resolvedVersions = Object.fromEntries(
  await Promise.all(
    Object.entries(FALLBACK_VERSIONS).map(async ([packageId, fallback]) =>
      [packageId, (await fetchLatestStable(packageId)) ?? fallback] as const,
    ),
  ),
)

// The substituted version is only as current as the last deploy, so the span
// doubles as a marker the client script re-resolves and updates in place. The
// copy button reads the code block's text content at click time, so whatever
// the span holds then is what a reader copies.
function substituteVersions(html: string) {
  return html.replace(LATEST_VERSION_PLACEHOLDER, (placeholder, packageId) => {
    const version = resolvedVersions[packageId]
    if (!version) return placeholder

    return `<span class="package-version" data-package="${packageId}">${version}</span>`
  })
}

export default defineConfig({
  title: 'ghūl programming language',
  description: 'documentation for the ghūl programming language',
  lang: 'en-US',
  cleanUrls: true,

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'keywords', content: 'ghul, ghul programming language, ghoul, ghoul programming language, ghūl, ghūl programming language' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', { 'data-goatcounter': 'https://ghul.goatcounter.com/count', async: '', src: '//gc.zgo.at/count.js' }],
  ],

  markdown: {
    languages: [ghulGrammar as any],
    theme: { light: 'light-plus', dark: 'dark-plus' },

    // Highlight inline `code` spans as ghūl by default. Almost every
    // inline code mention on this site is a ghūl snippet (keyword, type,
    // expression), so defaulting to ghūl avoids the bare-monospace look
    // the brand-green default gave them.
    //
    // A trailing `{:lang}` suffix overrides the language for one span —
    // `` `dotnet tool restore`{:text} `` opts out of highlighting, and
    // `` `<Project>`{:xml} `` highlights as XML. The pre-rule walks the
    // inline token stream, lifts the suffix off the following text token,
    // and stashes it on the `code_inline` token as `data-lang`.
    config(md) {
      const fence = md.renderer.rules.fence!
      md.renderer.rules.fence = (...args) => substituteVersions(fence(...args))

      md.core.ruler.after('inline', 'ghul-inline-lang', state => {
        for (const block of state.tokens) {
          if (block.type !== 'inline' || !block.children) continue
          const children = block.children
          for (let i = 0; i < children.length - 1; i++) {
            if (children[i].type !== 'code_inline') continue
            const next = children[i + 1]
            if (next.type !== 'text') continue
            const m = /^\{:([\w+-]+)\}/.exec(next.content)
            if (!m) continue
            children[i].attrSet('data-lang', m[1])
            next.content = next.content.slice(m[0].length)
          }
        }
      })

      md.renderer.rules.code_inline = (tokens, idx) => {
        const token = tokens[idx]
        const text = token.content
        const lang = token.attrGet('data-lang') ?? 'ghul'
        if (lang === 'text') {
          return substituteVersions(
            `<code class="ghul-inline-plain">${md.utils.escapeHtml(text)}</code>`,
          )
        }
        const html = ghulInlineHighlighter.codeToHtml(text, {
          lang,
          themes: { light: 'light-plus', dark: 'dark-plus' },
          defaultColor: false,
          structure: 'inline',
        })
        return substituteVersions(`<code class="ghul-inline">${html}</code>`)
      }
    },
  },

  vite: {
    plugins: [ghulExamplePagePlugin(), ghulExampleDataPlugin()],
  },

  themeConfig: {
    outline: { level: [2, 3], label: 'on this page' },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/degory/ghul' },
    ],

    sidebar: [
      { text: 'overview', link: '/' },
      { text: 'getting started', link: '/getting-started' },
      { text: 'language basics', link: '/language-basics' },
      { text: 'syntax', link: '/syntax' },
      { text: 'definitions', link: '/definitions' },
      { text: 'expressions', link: '/expressions' },
      { text: 'control flow', link: '/control-flow' },
      { text: 'expression oriented programming', link: '/expression-oriented-programming' },
      { text: 'functional programming', link: '/functional-programming' },
      { text: 'object oriented programming', link: '/object-oriented-programming' },
      { text: 'generics', link: '/generics' },
      { text: 'type inference', link: '/type-inference' },
      { text: '.NET integration', link: '/dotnet-integration' },
      { text: 'tooling', link: '/tooling' },
      { text: 'grammar', link: '/grammar' },
      { text: 'implementation', link: '/implementation' },
      { text: 'known issues', link: '/known-issues' },
      { text: 'resources', link: '/resources' },
      { text: 'history', link: '/history' },
    ],
  },
})
