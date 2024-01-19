/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

import { getPrismConfiguredForGhul } from './getPrismConfiguredForGhul';

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  const Prism = getPrismConfiguredForGhul();
  
  if (typeof process === 'undefined' || process.env.VUE_ENV !== 'server') {

    import('./public/prism-vsc-dark-plus.css').then(module => {
      console.log("QQQ imported prism-vsc-dark-plus.css: ", module.default);

      const styleElement = document.createElement('style')

      console.log("AAA");
      styleElement.textContent = module.default
      console.log("BBB");
      document.head.appendChild(styleElement)

      console.log("CCC Prism: ", Prism);      

      window.onload = () => {
        console.log("DDD Prism.highlightAll()...");
        Prism.highlightAll();
        console.log("EEE Prism.highlightAll() done.");
      };
    })

    router.onReady(() => {
      console.log("FFF Prism.highlightAll()...");
      Prism.highlightAll();
      console.log("GGG Prism.highlightAll() done.");
    });
  }
}


