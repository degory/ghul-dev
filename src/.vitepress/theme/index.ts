import DefaultTheme from 'vitepress/theme'
import GhulExample from './components/GhulExample.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('GhulExample', GhulExample)
  },
}
