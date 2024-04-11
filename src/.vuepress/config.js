const { description } = require('../../package');

const { getPrismConfiguredForGhul } = require('./getPrismConfiguredForGhul');

getPrismConfiguredForGhul();

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'ghūl programming language',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'stylesheet', href: '/prism-vsc-dark-plus.css' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],    
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    sidebarDepth: 3,
    sidebar: [
      ['/', 'overview'], 
      ['/getting-started', 'getting started'],
      ['/language-basics', 'language basics'],
      ['/definitions', 'definitions'],
      ['/expressions', 'expressions'],
      ['/control-flow', 'control flow'],
      ['/functional-programming', 'functional programming'],
      ['/object-oriented-programming', 'object oriented programming'],
      ['/generics', 'generics'],
      ['/dotnet-integration', '.NET integration'],
      ['/grammar', 'grammar'],
      ['/known-issues', 'known issues'],
      ['/resources', 'resources'],
      ['/history', 'history']
    ],
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ],


  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-prism'), {
        defaultLanguage: 'ghul'
      });
    }
  }
}
