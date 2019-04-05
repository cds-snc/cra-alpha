const Polyglot = require('node-polyglot')

const phrases = {
  en: {
    alpha:
      'This site will be changing as we test ideas and learn from folks like you',
    welcome: 'File your taxes to receive your benefits',
  },
  fr: {
    alpha: 'Ce site va changer souvent à mesure que nous apprendrons de vous.',
    welcome:
      'Veuillez compléter votre déclaration pour obtenir vos prestations',
  },
}

module.exports = new Polyglot({
  phrases: phrases,
  interpolation: { prefix: '{{', suffix: '}}' },
})
