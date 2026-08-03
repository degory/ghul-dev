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
  },
  enhanceApp({ app }) {
    app.component('GhulExample', GhulExample)
    app.component('GhulExampleSwitcher', GhulExampleSwitcher)
  },
}
