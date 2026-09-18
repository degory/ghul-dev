# tools

## pull-rosetta.mjs

Brings the Rosetta Code solutions here from
[ghul-rosetta-code](https://github.com/degory/ghul-rosetta-code), where they are written and where
each one's output is pinned by a test.

```sh
npm run pull-rosetta -- ../ghul-rosetta-code
```

It reads that repository's `index.json` and writes, for every task in it, a page under
`src/rosetta`, one `src/.vitepress/example-data/rosetta-*.json` per part, the images a drawing
program is expected to produce under `src/public/rosetta`, and the manifest the explorer page is
driven by, `src/.vitepress/rosetta-tasks.json`.

Nothing about the corpus is decided here. Which tasks exist, how they are tagged, how interesting
each is and whether the playground can run it all come from `index.json`, so a solution added to
`ghul-rosetta-code` appears here at the next pull with nothing to place by hand.

These examples do not go through `example-tool`. Compiling and running every solution is the
source repository's test suite's job, and the output shown here is the output that suite pins, so
a page still cannot show output the code does not produce. What they go without is hover data,
which only a compile gives; the editor supplies it once a reader opens one.

Everything it writes is generated. To change a solution, change it in `ghul-rosetta-code` and pull
again; an edit made here is lost at the next pull and leaves this site disagreeing with both the
source repository and the wiki.

To check the committed copy is current - for CI:

```sh
npm run pull-rosetta -- ../ghul-rosetta-code
git diff --exit-code src/rosetta src/public/rosetta src/.vitepress/rosetta-tasks.json src/.vitepress/example-data
```
