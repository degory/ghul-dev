// Bring the Rosetta Code solutions here from ghul-rosetta-code, where they are written and where
// each one's output is pinned by a test.
//
//   node tools/pull-rosetta.mjs <ghul-rosetta-code-checkout>
//
// Everything is derived from that repository's index.json: which tasks there are, their parts,
// their tags, which can run in the playground, and where each part's source, recorded output and
// expected images live. Nothing about the corpus is decided here, so a solution added there
// appears here at the next pull with nobody placing it.
//
// Writes, per task:
//
//   src/.vitepress/example-data/rosetta-<id>.json   one per part: the source and its output
//   src/rosetta/<slug>.md                           the page
//   src/public/rosetta/<id>/<name>.png              what a drawing program is expected to draw
//
// plus src/rosetta/index.md and src/.vitepress/rosetta-tasks.json, the manifest the explorer
// renders from.
//
// The example data is written directly rather than by example-tool, because compiling and running
// every solution is ghul-rosetta-code's test suite's job and it has already done it: the output
// here is that suite's pinned output, so a page still cannot show output the code does not
// produce. What these examples go without is hover data, which only a compile gives; the editor
// supplies it once the reader opens one.

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, readdirSync, copyFileSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const source = process.argv[2]

if (!source || !existsSync(join(source, 'index.json'))) {
  console.error('usage: node tools/pull-rosetta.mjs <ghul-rosetta-code-checkout>')
  process.exit(1)
}

const index = JSON.parse(readFileSync(join(source, 'index.json'), 'utf8'))

if (index.version !== 1) {
  console.error(`index.json is version ${index.version}; this script reads version 1`)
  process.exit(1)
}

const DATA = join(ROOT, 'src/.vitepress/example-data')
const PAGES = join(ROOT, 'src/rosetta')
const IMAGES = join(ROOT, 'src/public/rosetta')

// Generated output is replaced wholesale, so a task that goes away there leaves nothing behind
// here.
rmSync(PAGES, { recursive: true, force: true })
rmSync(IMAGES, { recursive: true, force: true })
mkdirSync(PAGES, { recursive: true })

readdirSync(DATA, { withFileTypes: true })
  .filter(e => e.isFile() && e.name.startsWith('rosetta-') && e.name.endsWith('.json'))
  .forEach(e => rmSync(join(DATA, e.name), { force: true }))

// Earlier pulls carried each solution as an example for example-tool to compile.
readdirSync(join(ROOT, 'examples'), { withFileTypes: true })
  .filter(e => e.isDirectory() && e.name.startsWith('rosetta-'))
  .forEach(e => rmSync(join(ROOT, 'examples', e.name), { recursive: true, force: true }))

const read = path => readFileSync(join(source, path), 'utf8')

// A part's id is a slug, or a slug and a part: the path the playground loads it by.
const exampleName = id => `rosetta-${id.replace(/\//g, '-')}`

const manifest = []

let examples = 0

for (const task of index.tasks) {
  const body = []

  for (const part of task.parts) {
    const name = exampleName(part.id)
    const code = read(part.source).replace(/\n+$/, '')

    const images = part.images.map(path => {
      // <name>.png.expected in the source repository is a PNG.
      const file = basename(path).replace(/\.expected$/, '')

      mkdirSync(join(IMAGES, part.id), { recursive: true })
      copyFileSync(join(source, path), join(IMAGES, part.id, file))

      return { name: file, url: `/rosetta/${part.id}/${file}` }
    })

    writeFileSync(
      join(DATA, `${name}.json`),
      JSON.stringify({
        name,
        code,
        fullSource: code,
        output: part.output && existsSync(join(source, part.output)) ? read(part.output) : '',
        images,
        // Opens in the editor only where the playground can run it.
        playground: part.playground,
        playgroundPath: part.id,
        hovers: [],
        diagnostics: [],
      }, null, 2) + '\n'
    )

    examples++

    if (part.heading) {
      body.push(`## ${part.heading}`, '')
    }

    body.push(`<GhulExample name="${name}" run-to-see />`, '')
  }

  writeFileSync(
    join(PAGES, `${task.slug}.md`),
    [
      '---',
      `title: ${JSON.stringify(task.title)}`,
      '---',
      '',
      `# ${task.title}`,
      '',
      `<RosettaTask url="${task.url.replace(/"/g, '%22')}" tags="${task.tags.join(',')}" :playground="${task.playground}" />`,
      '',
      ...body,
    '## more tasks',
    '',
    // Client-side only: prerendered, the list of every task would be repeated in every page.
    '<ClientOnly>',
    `<RosettaExplorer current="${task.slug}" />`,
    '</ClientOnly>',
    '',
    ].join('\n')
  )

  manifest.push({
    slug: task.slug,
    title: task.title,
    url: task.url,
    tags: task.tags,
    interest: task.interest,
    playground: task.playground,
    input: task.input,
    images: task.images.length > 0,
    lines: task.lines,
    parts: task.parts.map(part => ({ name: exampleName(part.id), heading: part.heading })),
  })
}

writeFileSync(
  join(ROOT, 'src/.vitepress/rosetta-tasks.json'),
  JSON.stringify({ tags: index.tags, tasks: manifest }) + '\n'
)

writeFileSync(
  join(PAGES, 'index.md'),
  `---
title: Rosetta Code
---

# Rosetta Code

ghūl solutions to ${manifest.length} [Rosetta Code](https://rosettacode.org) tasks. Every one that
says so can be changed and run here, in your browser.

<RosettaExplorer />
`
)

console.log(`${manifest.length} tasks, ${examples} examples`)
