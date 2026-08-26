# tools

## pull-rosetta.mjs

Brings the Rosetta Code solutions here from
[ghul-rosetta-code](https://github.com/degory/ghul-rosetta-code), where they are written and where
each one's output is pinned by a test.

```sh
npm run pull-rosetta -- ../ghul-rosetta-code
dotnet run --project example-tool -- examples src/.vitepress/example-data
```

The first step writes `examples/rosetta-*`, `src/rosetta/*.md` and
`src/.vitepress/rosetta-tasks.json`. The second compiles and runs every example, which is what
produces the code and output the pages display - the puller never writes a program's output, so a
page cannot show output the code does not produce.

Everything it writes is generated. To change a solution, change it in `ghul-rosetta-code` and pull
again; an edit made here is lost at the next pull and leaves this site disagreeing with both the
source repository and the wiki.

A published task has to be placed in a group in `src/.vitepress/rosetta-groups.ts`, and the pull
fails naming any that is not. That is deliberate: the section is navigated by its groups, so an
unplaced task would be carried but unreachable.

To check the committed copy is current - for CI:

```sh
npm run pull-rosetta -- ../ghul-rosetta-code
git diff --exit-code examples src/rosetta src/.vitepress/rosetta-tasks.json
```
