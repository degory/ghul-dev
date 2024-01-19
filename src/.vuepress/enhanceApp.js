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
  const Prism = require('prismjs');

  if (!Prism.languages.ghul) {
  
    console.log('set-up Prism.languages.ghul...');
  
    Prism.languages.ghul = {
      'comment': {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:\/\/).*)/,
        lookbehind: true
      },
      'string' : {
        pattern: /(^|[^@\\])("|')(?:\\?[\s\S])*?\2/,
        greedy: true,
        lookbehind: true
      },
      'control': /\b(assert|if|then|elif|else|fi|for|in|while|do|od|continue|break|case|when|default|esac|throw|try|catch|finally|yrt|return)\b/,
      'keyword': /\b(new|cast|isa|namespace|class|trait|enum|use|is|si|let|ptr|ref|static|public|protected|private|typeof|->|=>)\b/,
      'boolean': /\b(?:true|false|null)\b/,
      'class-name': /\b([A-Z][A-Za-z0-9_`]*|void|bool|byte|ubyte|short|ushort|int|uint|long|ulong|word|uword|char|object|string)\b/,
      'function': /\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*\()/, 
      'number': /\b-?\d*\.?[\d]+\b/,
      'operator': /(!|\$|%|\^|&|\*|-|\+|=|\||@|~|#|\\|<|>|\.|\?|\/|\*)+/,
      'punctuation': /[;[\](),.]/,
      'variable': /\b([`a-zA-Z_][a-zA-Z0-9_]*)\b/,		
    }
  
    console.log('set-up Prism.languages.ghul...done');
  } else {
    console.log('Prism.languages.ghul already set-up');
  }
  
  console.log('languages is now: ', Prism.languages);
  
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
