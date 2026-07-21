// Resolves the latest stable version of a package from the NuGet flat
// container. Used from two places: the build, to bake a version into the
// static HTML, and the browser, to refresh that version on a page already
// deployed. The flat container is unauthenticated and unmetered, so the
// client-side call carries no rate-limit risk for readers.
const FLAT_CONTAINER = 'https://api.nuget.org/v3-flatcontainer'

// Versions the site falls back to when NuGet can't be reached. The build
// overwrites these with whatever is current at deploy time, so they only
// have to hold for a reader whose own fetch fails.
export const FALLBACK_VERSIONS: Record<string, string> = {
  'ghul.compiler': '22.0.0',
  'ghul.runtime': '5.5.1',
}

// The flat container documents its index as SemVer-ordered, but the ordering
// isn't worth trusting for a version that ends up in copy-pasted install
// instructions — compare explicitly instead. Prereleases are dropped: the
// docs should only ever offer a reader a stable version.
function latestStable(versions: string[]): string | null {
  const stable = versions.filter(v => !v.includes('-'))

  let latest: string | null = null
  for (const version of stable) {
    if (latest === null || compareVersions(version, latest) > 0) {
      latest = version
    }
  }
  return latest
}

function compareVersions(a: string, b: string): number {
  const left = a.split('.').map(Number)
  const right = b.split('.').map(Number)

  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    const difference = (left[i] ?? 0) - (right[i] ?? 0)
    if (difference !== 0) return difference
  }
  return 0
}

// Never throws and never rejects: every failure path — offline, DNS, non-200,
// timeout, malformed body, a package with no stable version — returns null so
// the caller keeps whatever version it already had.
export async function fetchLatestStable(
  packageId: string,
  timeoutMs = 3000,
): Promise<string | null> {
  try {
    const response = await fetch(
      `${FLAT_CONTAINER}/${packageId.toLowerCase()}/index.json`,
      { signal: AbortSignal.timeout(timeoutMs) },
    )
    if (!response.ok) return null

    const body = await response.json()
    if (!Array.isArray(body?.versions)) return null

    return latestStable(body.versions)
  } catch {
    return null
  }
}
