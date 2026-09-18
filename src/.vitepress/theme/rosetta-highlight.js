// Syntax colour for code the site did not have at build time.
//
// Every other example on the site is tokenised by the build - the ghul-example-data plugin folds a
// `tokens` field into each artifact - because the code is in the repository and colouring it once
// is free. The Rosetta Code solutions are fetched when they are shown, so there is nothing to fold
// them into and the colouring has to happen in the reader's browser.
//
// It is the same Shiki, the same vendored ghūl grammar and the same two VS Code themes, so a
// solution is coloured exactly as a fenced block or a built example is. What differs is the regex
// engine: Shiki's default is Oniguruma compiled to WebAssembly, and its JavaScript engine produces
// identical tokens for this grammar without the WebAssembly to download. The whole highlighter is
// behind a dynamic import, so only a reader who opens this section pays for it at all.

const themes = { light: 'light-plus', dark: 'dark-plus' }

let highlighter = null

async function load() {
  if (!highlighter) {
    highlighter = (async () => {
      const [{ createHighlighterCore }, { createJavaScriptRegexEngine }, grammar] = await Promise.all([
        import('shiki/core'),
        import('shiki/engine/javascript'),
        import('../ghul.tmLanguage.json'),
      ])

      return createHighlighterCore({
        themes: [import('shiki/themes/light-plus.mjs'), import('shiki/themes/dark-plus.mjs')],
        langs: [grammar.default ?? grammar],
        engine: createJavaScriptRegexEngine(),
      })
    })()

    highlighter.catch(() => { highlighter = null })
  }

  return highlighter
}

// One line per source line, each a run of `{ text, style }` - the shape <GhulExample> merges with
// hovers and diagnostics. `defaultColor: false` gives each token both themes' colours as custom
// properties, which the component's CSS maps to `color` per light and dark mode.
export async function tokenise(code) {
  const { codeToTokens } = await load()

  return codeToTokens(code, { lang: 'ghul', themes, defaultColor: false }).tokens
    .map(line => line.map(token => ({ text: token.content, style: token.htmlStyle ?? {} })))
}
