const Prism = require('prismjs');

function getPrismConfiguredForGhul() {
  if (!Prism.languages.ghul) {
    console.log('set-up Prism.languages.ghul...');

    const interpolationPattern = {
      pattern: /\{[^{}]*\}/,
      inside: {
        'interpolation-punctuation': {
          pattern: /^\{|\}$/,
          alias: 'punctuation'
        },
        'control': /\b(assert|if|then|elif|else|fi|for|in|while|do|od|continue|break|case|when|default|esac|throw|try|catch|finally|yrt|return)\b/,
        'keyword': /\b(new|cast|isa|namespace|class|trait|struct|enum|use|is|si|let|ptr|ref|static|public|protected|private|typeof|rec|->|=>)\b/,
        'boolean': /\b(?:true|false|null)\b/,
        'class-name': /\b([A-Z][A-Za-z0-9_`]*|void|bool|byte|ubyte|short|ushort|int|uint|long|ulong|word|uword|char|object|string|single|double)\b/,
        'function': /\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*\()/,
        'number': /\b-?\d*\.?[\d]+\b/,
        'operator': /(!|\$|%|\^|&|\*|-|\+|=|\||@|~|#|\\|<|>|\.|\?|\/|\*)+/,
        'punctuation': /[;[\](),.]/,
        'variable': /\b([`a-zA-Z_][a-zA-Z0-9_]*)\b/,
        }
    };    

    Prism.languages.ghul = {
      'comment': {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:\/\/).*)/,
        lookbehind: true
      },
      'string': {
        pattern: /(^|[^@\\])"(?:\\[\s\S]|[^\\"]|\{(?:\\[\s\S]|[^\\}])*\})*"/,
        greedy: true,
        lookbehind: true,
        inside: {
          'interpolation': interpolationPattern
        }
      },
      'control': /\b(assert|if|then|elif|else|fi|for|in|while|do|od|continue|break|case|when|default|esac|throw|try|catch|finally|yrt|return)\b/,
      'keyword': /\b(new|cast|isa|namespace|class|trait|struct|enum|use|is|si|let|ptr|ref|static|public|protected|private|typeof|rec|->|=>)\b/,
      'boolean': /\b(?:true|false|null)\b/,
      'class-name': /\b([A-Z][A-Za-z0-9_`]*|void|bool|byte|ubyte|short|ushort|int|uint|long|ulong|word|uword|char|object|string|single|double)\b/,
      'function': /\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*\()/,
      'number': /\b-?\d*\.?[\d]+\b/,
      'operator': /(!|\$|%|\^|&|\*|-|\+|=|\||@|~|#|\\|<|>|\.|\?|\/|\*)+/,
      'punctuation': /[;[\](),.]/,
      'variable': /\b([`a-zA-Z_][a-zA-Z0-9_]*)\b/,
    };

    console.log('set-up Prism.languages.ghul...done');
  } else {
    console.log('Prism.languages.ghul already set-up');
  }

  console.log('languages is now: ', Prism.languages);
  return Prism;
}

module.exports = {
  getPrismConfiguredForGhul
};
