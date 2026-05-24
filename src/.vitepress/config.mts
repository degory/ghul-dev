import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { createHighlighter } from 'shiki'

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

      // The code is multi-line. Each hover description is a single line and
      // is itself ghūl-coloured — the VSCE renders HOVER text the same way.
      data.tokens = tokenise(data.code)
      data.hovers = (data.hovers ?? []).map(hover => ({
        ...hover,
        tokens: tokenise(hover.text)[0] ?? [],
      }))

      return { code: JSON.stringify(data), map: null }
    },
  }
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
          return `<code class="ghul-inline-plain">${md.utils.escapeHtml(text)}</code>`
        }
        const html = ghulInlineHighlighter.codeToHtml(text, {
          lang,
          themes: { light: 'light-plus', dark: 'dark-plus' },
          defaultColor: false,
          structure: 'inline',
        })
        return `<code class="ghul-inline">${html}</code>`
      }
    },
  },

  vite: {
    plugins: [ghulExampleDataPlugin()],
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
      { text: 'functional programming', link: '/functional-programming' },
      { text: 'object oriented programming', link: '/object-oriented-programming' },
      { text: 'generics', link: '/generics' },
      { text: 'type inference', link: '/type-inference' },
      { text: '.NET integration', link: '/dotnet-integration' },
      { text: 'tooling', link: '/tooling' },
      { text: 'grammar', link: '/grammar' },
      { text: 'known issues', link: '/known-issues' },
      { text: 'resources', link: '/resources' },
      { text: 'history', link: '/history' },
    ],
  },
})
