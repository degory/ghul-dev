import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, onMounted, watch } from 'vue'
import GhulExample from './components/GhulExample.vue'
import GhulExampleSwitcher from './components/GhulExampleSwitcher.vue'
import { refreshPackageVersions } from './package-versions'
import './style.css'

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()

    onMounted(refreshPackageVersions)
    watch(() => route.path, () => nextTick(refreshPackageVersions))

    // In-site navigation is client-side and the counter only records a
    // pageview at script load, so without this a multi-page session shows up
    // as a single-page one. The dedupe keeps a hash-only move on the same
    // page from counting as a pageview.
    let counted_path = typeof location !== 'undefined' ? location.pathname : ''
    watch(() => route.path, () =>
      nextTick(() => {
        if (location.pathname === counted_path) return
        counted_path = location.pathname
        window.goatcounter?.count?.()
      }))
  },
  enhanceApp({ app }) {
    app.component('GhulExample', GhulExample)
    app.component('GhulExampleSwitcher', GhulExampleSwitcher)
  },
}
