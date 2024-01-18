const { description } = require('../../package')

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

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'ghūl programming language docs',
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
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Config',
        link: '/config/'
      },
      {
        text: 'VuePress',
        link: 'https://v1.vuepress.vuejs.org'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'using-vue',
          ]
        }
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
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
