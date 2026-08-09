// The site's pages, grouped into sidebar sections and in reading order
// within each. The sidebar is built from SECTIONS, and the plain-text
// rendering under /text from the flattened PAGES, so the two can't drift
// apart.
//
// The groups separate the site's registers: "ghūl" is the front door
// (the overview and how to install), "tour" is the narrative
// teach-by-example path a newcomer reads in order, "guides" are practical
// how-tos, "reference" is for looking things up, and "about" is the story
// of the project itself.
export const SECTIONS = [
  {
    text: 'ghūl',
    items: [
      { text: 'overview', link: '/' },
      { text: 'getting started', link: '/getting-started' },
    ],
  },
  {
    text: 'tour',
    items: [
      { text: 'language basics', link: '/language-basics' },
      { text: 'optional types', link: '/optional-types' },
      { text: 'type narrowing', link: '/type-narrowing' },
      { text: 'unions and pattern matching', link: '/unions-and-pattern-matching' },
      { text: 'expression oriented programming', link: '/expression-oriented-programming' },
      { text: 'functional programming', link: '/functional-programming' },
      { text: 'object oriented programming', link: '/object-oriented-programming' },
      { text: 'generics', link: '/generics' },
      { text: 'type inference', link: '/type-inference' },
      { text: 'async and generators', link: '/async-and-generators' },
    ],
  },
  {
    text: 'guides',
    items: [
      { text: '.NET integration', link: '/dotnet-integration' },
      { text: 'runtime library', link: '/runtime-library' },
      { text: 'tooling', link: '/tooling' },
    ],
  },
  {
    text: 'reference',
    items: [
      { text: 'syntax', link: '/syntax' },
      { text: 'definitions', link: '/definitions' },
      { text: 'expressions', link: '/expressions' },
      { text: 'control flow', link: '/control-flow' },
      { text: 'grammar', link: '/grammar' },
      { text: 'known issues', link: '/known-issues' },
    ],
  },
  {
    text: 'about',
    items: [
      { text: 'implementation', link: '/implementation' },
      { text: 'history', link: '/history' },
      { text: 'resources', link: '/resources' },
    ],
  },
]

// Every page in sidebar order, ignoring the grouping - the reading order the
// /text rendering follows.
export const PAGES = SECTIONS.flatMap(section => section.items)

// The markdown file backing a page, without its extension.
export function pageSlug(link: string) {
  return link === '/' ? 'index' : link.replace(/^\//, '')
}
