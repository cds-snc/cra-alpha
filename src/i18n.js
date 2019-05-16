const Polyglot = require('node-polyglot')

const phrases = {
  en: {
    alpha: 'This site will be changing as we test ideas and learn from folks like you',
    welcome: 'File your taxes to receive your benefits',
    checklist: {
      title: 'About you',
      intro:
        'This is the current name and address we have on file for you. Please update any out- of - date information and then continue to the next section.',
      personalInformation: '1. Personal Information',
      financialInformation: '2. Financial Information',
      file: 'File my taxes',
    },
  },
  fr: {
    alpha: 'Ce site va changer souvent à mesure que nous apprendrons de vous.',
    welcome: 'Veuillez compléter votre déclaration pour obtenir vos prestations',
    checklist: {
      title: 'A propos de vous',
      intro:
        'Voici le nom et l\'adresse dont nous disposons dans votre dossier. Merci de mettre à jour toute information qui ne serait pas correcte vous concernant avant de passer à la prochaine étape.',
      personalInformation: 'Mes Informations Personnelles',
      financialInformation: 'Mes Informations Financieres',
      file: 'Déclarer mes impôts',
    },
  },
}

module.exports = new Polyglot({
  phrases: phrases,
  interpolation: { prefix: '{{', suffix: '}}' },
})
