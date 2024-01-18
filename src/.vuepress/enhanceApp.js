/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

import Prism from 'prismjs';

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  if (typeof process === 'undefined' || process.env.VUE_ENV !== 'server') {

    import('./public/prism-vsc-dark-plus.css').then(module => {
      console.log("imported prism-vsc-dark-plus.css: ", module.default);

      const styleElement = document.createElement('style')
      styleElement.textContent = module.default
      document.head.appendChild(styleElement)
    })

    // import 'prismjs/themes/prism.css';    

  }
}
