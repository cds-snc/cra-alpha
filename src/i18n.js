const Polyglot = require('node-polyglot')

const phrases = {
  en: {
    alpha:
      'This site will be changing as we test ideas and learn from folks like you',
    continue: 'Continue',
    get_started: 'Get started',

    about_you: {
      title: 'About You',
      intro: 'This is the current name and address we have on file for you. Please update any out-of-date information and then continue to the next section.',
      remaining: 'There are <strong>2 sections</strong> remaining, which should take <strong>5 minutes</strong> to complete.',
    },

    welcome: {
      title: 'Claim tax benefits (CTB)',
      file_taxes: 'File your taxes to receive your benefits',
      need_to_know: 'You will need to know:',
      firstname: 'Your first name',
      cra_info_about_you: 'Then, you will see the information CRA has on file about you. If it is up to date, you will be able to file your return immediately.',
    },
    income: {
      title: 'Your income',
      sample_t4 : 'Sample T4 form',
      income_data : 'Income Data',
      last_section : 'This is the <strong>last section</strong>. You will have the opportunity to review all your information and get an estimate of your return before submitting your taxes.',
      accurate : 'This information is accurate',
      make_changes : 'I need to make changes',
    },
    family: {
      title: 'Your family',
      intro: 'This is the current marital status and number of dependent children we have on file for you. Please update any out-of-date information and then continue to the next section.',
      remaining : 'There is <strong>1 section</strong> remaining, which should take <strong>1 minute</strong> to complete.',
    },
    login: {
      title: 'Log in to see your tax-filing information<',
      enter_firstname: 'Please enter your first name.',
      firstname: 'First name',
      login: 'Log in',
    },
    intro: {
      hi: "Hi, {{name}}",
      info_about_you: 'Here’s what we know about you based on your previous tax returns and information from your employer, {{employerName}}',
      update_info_if_wrong: 'If any of this information is wrong, you’ll have a chance to update it.',
      review: 'On the following pages, you can review each section and correct any outdated information. Once your information is up-to-date, you will be ready to submit your tax return.',
      remaining: ' There are <strong>3 sections</strong> in total, and it should take approximately <strong>10 minutes</strong> to complete.',
    },
    confirmation: {
      title: "Success! 🥳🙌",
      intro: '🌈 Good job, {{name}}! 🌈',
      benefits: 'Your 2018 taxes have been submitted and {{strong}}you will receive $1611.87 in benefit payments{{strongEnd}}.',
      confirmation: 'Confirmation number',
      noa: 'Your Notice of Assessment will arrive in the mail in 4 to 6 weeks.',
    },


  },
  fr: {
    alpha: 'Ce site va changer souvent à mesure que nous apprendrons de vous.',
    continue: 'Continue',
    get_started: 'Get started',

    about_you: {
      title: 'About You',
      intro: 'This is the current name and address we have on file for you. Please update any out-of-date information and then continue to the next section.',
      remaining: 'There are <strong>2 sections</strong> remaining, which should take <strong>5 minutes</strong> to complete.',
    },

    welcome: {
      title: 'Claim tax benefits (CTB)',
      file_taxes: 'File your taxes to receive your benefits',
      need_to_know: 'You will need to know:',
      firstname: 'Your first name',
      cra_info_about_you: 'Then, you will see the information CRA has on file about you. If it is up to date, you will be able to file your return immediately.',
    },
    income: {
      title: 'Your income',
      sample_t4 : 'Sample T4 form',
      income_data : 'Income Data',
      last_section : 'This is the <strong>last section</strong>. You will have the opportunity to review all your information and get an estimate of your return before submitting your taxes.',
      accurate : 'This information is accurate',
      make_changes : 'I need to make changes',
    },
    family: {
      title: 'Your family',
      intro: 'This is the current marital status and number of dependent children we have on file for you. Please update any out-of-date information and then continue to the next section.',
      remaining : 'There is <strong>1 section</strong> remaining, which should take <strong>1 minute</strong> to complete.',
    },
    login: {
      title: 'Log in to see your tax-filing information<',
      enter_firstname: 'Please enter your first name.',
      firstname: 'First name',
      login: 'Log in',
    },
    intro: {
      hi: "Hi, {{name}}",
      info_about_you: 'Here’s what we know about you based on your previous tax returns and information from your employer, {{employerName}}',
      update_info_if_wrong: 'If any of this information is wrong, you’ll have a chance to update it.',
      review: 'On the following pages, you can review each section and correct any outdated information. Once your information is up-to-date, you will be ready to submit your tax return.',
      remaining: ' There are <strong>3 sections</strong> in total, and it should take approximately <strong>10 minutes</strong> to complete.',
    },
    confirmation: {
      title: "Success! 🥳🙌",
      intro: '🌈 Good job, {{name}}! 🌈',
      benefits: 'Your 2018 taxes have been submitted and {{strong}}you will receive $1611.87 in benefit payments{{strongEnd}}.',
      confirmation: 'Confirmation number',
      noa: 'Your Notice of Assessment will arrive in the mail in 4 to 6 weeks.',
    },
  },
}

module.exports = new Polyglot({
  phrases: phrases,
  interpolation: { prefix: '{{', suffix: '}}' },
})
