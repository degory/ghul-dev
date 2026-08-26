// Bring the Rosetta Code solutions here from ghul-rosetta-code, where they are written and where
// each one's output is pinned by a test.
//
//   node tools/pull-rosetta.mjs <ghul-rosetta-code-checkout>
//
// Writes, per published task:
//
//   examples/rosetta-<slug>[-<part>]/….ghul   the source, which example-tool compiles and runs
//   src/rosetta/<slug>.md                     the page
//
// plus src/rosetta/index.md and src/.vitepress/rosetta-tasks.json, the manifest the index page
// renders from.
//
// The dependency points this way round on purpose. Knowing how this site renders an example is
// this site's business, so ghul-rosetta-code holds solutions, tests and a ledger and knows
// nothing about VitePress. Which tasks to carry and how to group them are decisions made here.
//
// Everything under src/rosetta and examples/rosetta-* is generated: edit a solution in
// ghul-rosetta-code and pull again. What this script must never do is write a program's output -
// example-tool produces that by running the code, so a page cannot show output the code does not
// produce.

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const source = process.argv[2]

if (!source || !existsSync(join(source, 'TASKS.json'))) {
  console.error('usage: node tools/pull-rosetta.mjs <ghul-rosetta-code-checkout>')
  process.exit(1)
}

const { ROSETTA_GROUPS, NOT_CARRIED } = await import('../src/.vitepress/rosetta-groups.ts')

// NN-name orders a task's parts and names its section, the same convention the wiki markup uses.
const heading = part => {
  const name = part.replace(/^\d+-/, '').replace(/-/g, ' ')

  return name.charAt(0).toUpperCase() + name.slice(1)
}

const parts = slug => {
  const dir = join(source, 'tasks', slug)

  return readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory() && /^\d\d-/.test(e.name))
    .map(e => e.name)
    .sort()
}

const ledger = JSON.parse(readFileSync(join(source, 'TASKS.json'), 'utf8'))

const published = ledger.tasks
  .filter(t => t.state === 'published' && t.slug && !(t.slug in NOT_CARRIED))
  .map(t => ({ ...t, ...JSON.parse(readFileSync(join(source, 'tasks', t.slug, 'task.json'), 'utf8')) }))

// A task nobody has placed would otherwise be carried but unreachable, so this is an error rather
// than a warning: the grouping is what the section is navigated by.
const placed = new Set(ROSETTA_GROUPS.flatMap(g => g.slugs))
const unplaced = published.filter(t => !placed.has(t.slug))

if (unplaced.length > 0) {
  console.error('these published tasks are not in any group in src/.vitepress/rosetta-groups.ts:')
  unplaced.forEach(t => console.error(`  ${t.slug}  (${t.task})`))
  process.exit(1)
}

const known = new Set(published.map(t => t.slug))
const missing = [...placed].filter(s => !known.has(s))

if (missing.length > 0) {
  console.error('these slugs are grouped but not published in ghul-rosetta-code:')
  missing.forEach(s => console.error(`  ${s}`))
  process.exit(1)
}

// Generated output is replaced wholesale, so a task that goes away here does not leave a page
// behind.
rmSync(join(ROOT, 'src/rosetta'), { recursive: true, force: true })
mkdirSync(join(ROOT, 'src/rosetta'), { recursive: true })

readdirSync(join(ROOT, 'examples'), { withFileTypes: true })
  .filter(e => e.isDirectory() && e.name.startsWith('rosetta-'))
  .forEach(e => rmSync(join(ROOT, 'examples', e.name), { recursive: true, force: true }))

// example-tool treats any diagnostic as a failure unless the example says to expect one, so a
// solution the compiler warns about carries the marker. Which ones those are is recorded in the
// source repository, by its test's captured warnings - a fact about the solution rather than
// about this site. The marker sits above `// >>>`, the tool's hidden-scaffold mark, so a reader
// never sees it.
const warns = slug => {
  const captured = join(source, 'integration-tests', slug, 'warn.expected')

  return existsSync(captured) && readFileSync(captured, 'utf8').trim() !== ''
}

const example = (name, from, warning) => {
  const body = readFileSync(from, 'utf8')

  mkdirSync(join(ROOT, 'examples', name), { recursive: true })
  writeFileSync(
    join(ROOT, 'examples', name, `${name}.ghul`),
    warning ? `// expect: warning\n// >>>\n${body}` : body
  )

  return name
}

const manifest = []

for (const task of published) {
  const { slug } = task
  const found = parts(slug)

  const body = []

  if (found.length === 0) {
    const name = example(`rosetta-${slug}`, join(source, 'tasks', slug, `${slug}.ghul`), warns(slug))

    body.push(`<GhulExample name="${name}" />`)
  } else {
    for (const part of found) {
      const name = example(
        `rosetta-${slug}-${part}`,
        join(source, 'tasks', slug, part, `${part}.ghul`),
        warns(`${slug}-${part}`)
      )

      body.push(`## ${heading(part)}`, '', `<GhulExample name="${name}" />`, '')
    }
  }

  writeFileSync(
    join(ROOT, 'src/rosetta', `${slug}.md`),
    [
      '---',
      `title: ${JSON.stringify(task.task)}`,
      '---',
      '',
      `# ${task.task}`,
      '',
      `<RosettaTask url=${JSON.stringify(task.url)} />`,
      '',
      ...body,
    ].join('\n') + '\n'
  )

  manifest.push({ slug, title: task.task, url: task.url, parts: found.map(heading) })
}

const group = ROSETTA_GROUPS.map(g => ({
  title: g.title,
  blurb: g.blurb,
  tasks: g.slugs
    .map(s => manifest.find(t => t.slug === s))
    .sort((a, b) => a.title.localeCompare(b.title)),
}))

writeFileSync(
  join(ROOT, 'src/.vitepress/rosetta-tasks.json'),
  JSON.stringify(group, null, 2) + '\n'
)

writeFileSync(
  join(ROOT, 'src/rosetta/index.md'),
  `---
title: Rosetta Code
---

# Rosetta Code

ghūl solutions to [Rosetta Code](https://rosettacode.org) tasks. Each can be edited and run here:
click the pencil, change it, and run it in your browser.

<RosettaIndex />
`
)

const skipped = Object.keys(NOT_CARRIED).length

console.log(`${manifest.length} tasks, ${manifest.reduce((n, t) => n + Math.max(1, t.parts.length), 0)} examples`)

if (skipped > 0) {
  console.log(`${skipped} not carried: ${Object.keys(NOT_CARRIED).join(', ')}`)
}
console.log('next: dotnet run --project example-tool -- examples src/.vitepress/example-data')
