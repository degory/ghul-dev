// The site's pages, in reading order. The sidebar is built from this, and so
// is the plain-text rendering under /text, so the two can't drift apart.
export const PAGES = [
  { text: 'overview', link: '/' },
  { text: 'getting started', link: '/getting-started' },
  { text: 'language basics', link: '/language-basics' },
  { text: 'syntax', link: '/syntax' },
  { text: 'definitions', link: '/definitions' },
  { text: 'expressions', link: '/expressions' },
  { text: 'control flow', link: '/control-flow' },
  { text: 'optional types', link: '/optional-types' },
  { text: 'expression oriented programming', link: '/expression-oriented-programming' },
  { text: 'functional programming', link: '/functional-programming' },
  { text: 'object oriented programming', link: '/object-oriented-programming' },
  { text: 'generics', link: '/generics' },
  { text: 'type inference', link: '/type-inference' },
  { text: 'runtime library', link: '/runtime-library' },
  { text: '.NET integration', link: '/dotnet-integration' },
  { text: 'tooling', link: '/tooling' },
  { text: 'grammar', link: '/grammar' },
  { text: 'implementation', link: '/implementation' },
  { text: 'known issues', link: '/known-issues' },
  { text: 'resources', link: '/resources' },
  { text: 'history', link: '/history' },
]

// The markdown file backing a page, without its extension.
export function pageSlug(link: string) {
  return link === '/' ? 'index' : link.replace(/^\//, '')
}
