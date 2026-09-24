# tools

## serve.mjs

The built site, served the way the host serves it - clean URLs, and the one rule that makes
`/rosetta/<slug>` reach the section's page rather than a 404. That rule lives in the host's nginx
configuration, so `vitepress preview` does not have it and the section looks broken locally while
working in production.

```sh
npm run build && npm run serve
```

## rosetta-corpus.test.mjs

The Rosetta Code section is one page that reads the corpus from
[ghul-rosetta-code](https://github.com/ghul-lang/ghul-rosetta-code) when a reader opens it. Which task
a page address names, and which tasks a search and a set of tags leave, are the two decisions that
would otherwise only be found wrong in a browser, so they are plain functions in
`src/.vitepress/theme/rosetta-corpus.js` and this covers them.

```sh
npm test
```

Node's own test runner, no dependency to install. The module it tests imports nothing, which is
what lets the runner load it directly.
