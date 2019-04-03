const Polyglot = require('node-polyglot')

const phrases = {
  en: {
    welcome: 'File your taxes to receive your benefits',
  },
  fr: {
    welcome: 'Faites votre déclaration pour obtenir vos déductions',
  },
}

module.exports = new Polyglot({
  phrases: phrases,
  interpolation: { prefix: '{{', suffix: '}}' },
})
