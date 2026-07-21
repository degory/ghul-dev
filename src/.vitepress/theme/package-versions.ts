import { fetchLatestStable } from '../nuget-versions'

// Install instructions render with the version that was current when the
// site was built, marked up as `<span class="package-version" data-package>`.
// This refreshes those spans against NuGet so a page deployed months ago
// still offers a reader the current version. A failed lookup leaves the
// built-in version in place, silently — it is a working version, just an
// older one, so there is nothing useful to tell the reader.
const pending = new Map<string, Promise<string | null>>()

function latestVersionOf(packageId: string) {
  let lookup = pending.get(packageId)
  if (!lookup) {
    lookup = fetchLatestStable(packageId)
    pending.set(packageId, lookup)
  }
  return lookup
}

export function refreshPackageVersions() {
  const spans = document.querySelectorAll<HTMLElement>(
    'span.package-version[data-package]',
  )

  for (const span of spans) {
    const packageId = span.dataset.package
    if (!packageId) continue

    latestVersionOf(packageId).then(version => {
      if (version && version !== span.textContent) {
        span.textContent = version
      }
    })
  }
}
