// Counting what a reader does on the site.
//
// One event is one path, because the counter has no properties: everything an
// event says has to be in its path, and the first segment is the family a report
// groups on. Paths stay low-cardinality on purpose, and nothing a reader typed,
// no example source and no message from the compiler ever reaches one.
//
// Counting never matters. Every call is safe during the static build, where
// there is no window at all, when the counter did not load, which includes every
// local build, and when the reader has opted out.

// Two ways to not be counted, and both are the reader's rather than ours.
//
// `skipgc` is the counter's own opt-out, set by visiting #toggle-goatcounter, and
// count.js honours it by itself; reading it here only avoids the call.
//
// `?notrack` on the URL is for tests that drive a real browser against the real
// site and would otherwise count themselves.
function suppressed() {
  if (typeof window === 'undefined') return true

  try {
    if (new URLSearchParams(location.search).has('notrack')) return true
  } catch {
    return true
  }

  try {
    return localStorage.getItem('skipgc') === 't'
  } catch {
    // Storage can throw rather than answer, in a private window or with site
    // data blocked. Not being able to read the opt-out is not consent to count.
    return true
  }
}

export function countEvent(path: string, title = path) {
  if (suppressed()) return

  try {
    ;(window as any).goatcounter?.count?.({ path, title, event: true })
  } catch {
    // A counter that fails is not a reason for the page to.
  }
}

// Where a link goes, for the handful of destinations worth knowing about. The
// host rather than the URL, so one event stands for every link to that place and
// no path a reader visited is recorded.
const DESTINATIONS: [RegExp, string][] = [
  [/(^|\.)codespaces\.new$/, 'codespace'],
  [/(^|\.)marketplace\.visualstudio\.com$/, 'vscode-marketplace'],
  [/(^|\.)nuget\.org$/, 'nuget'],
  [/(^|\.)rosettacode\.org$/, 'rosetta-wiki'],
  [/(^|\.)github\.com$/, 'github']
]

export function destination(href: string): string | null {
  let host: string

  try {
    host = new URL(href, location.href).host
  } catch {
    return null
  }

  // A Codespace is opened by a github.com URL as often as by codespaces.new, so
  // it is recognised by its path before the host decides.
  if (/(^|\.)github\.com$/.test(host) && /\/codespaces\/new/.test(href)) return 'codespace'

  for (const [pattern, name] of DESTINATIONS) if (pattern.test(host)) return name

  return null
}

// One delegated listener for every outward link on the site, rather than a
// handler per page: the links live in Markdown and have nowhere to hang one.
// Only the destinations above are counted, so an ordinary link to anywhere else
// records nothing.
export function countOutboundLinks() {
  if (typeof document === 'undefined') return

  document.addEventListener('click', event => {
    const anchor = (event.target as Element | null)?.closest?.('a[href]')

    if (!anchor) return

    const name = destination(anchor.getAttribute('href') ?? '')

    if (name) countEvent(`outbound/${name}`, 'outbound link')
  })
}
