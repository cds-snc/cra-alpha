const { getFirstName } = require('../../src/api.js')

describe('Full run through', function() {
  it('successfully loads the home page', function() {
    cy.visit('/')

    // WELCOME PAGE
    cy.get('h1').should('contain', 'Claim tax benefits (CTB)')
    cy.get('main a')
      .should('contain', 'Get started')
      .click()

    // LOGIN PAGE
    cy.url().should('contain', '/login')
    cy.get('h1').should('contain', 'Log in to see your tax-filing information')

    cy.fixture('user').then(user => {
      cy.get('form label').should('have.attr', 'for', 'name')
      cy.get('form input#name')
        .type(user.name)
        .should('have.value', user.name)
      cy.get('form button')
        .should('contain', 'Log in')
        .click()

      // DASHBOARD PAGE
      cy.url().should('contain', '/dashboard')
      cy.get('h1').should('contain', `Hi, ${getFirstName(user.name)}`)

      cy.get('h2')
        .first()
        .should('contain', 'About you')

      Object.values(user).forEach(value => {
        cy.get('dd.value').should('contain', value)
      })

      cy.get('a.buttonLink')
        .should('contain', 'Get started')
        .click()

      // ABOUT YOU PAGE
      cy.get('h1').should('contain', 'About you')

      cy.get('dt.key')
        .eq(0)
        .should('contain', 'Name')
        .next('dd')
        .should('contain', user.name)

      cy.get('dt.key')
        .eq(1)
        .should('contain', 'Mailing address')
        .next('dd')
        .should('contain', user.address)

      cy.get('a.buttonLink')
        .should('contain', 'Continue')
        .click()

      // YOUR FAMILY PAGE
      cy.get('h1').should('contain', 'You and your family')
      cy.get('dt.key')
        .eq(0)
        .should('contain', 'Marital status')
        .next('dd')
        .should('contain', user.maritalStatus)

      cy.get('dt.key')
        .eq(1)
        .should('contain', 'Number of children')
        .next('dd')
        .should('contain', user.children)

      cy.get('a.buttonLink')
        .should('contain', 'Continue')
        .click()

      // YOUR INCOME PAGE
      cy.get('h1').should('contain', 'Your income')
      cy.get('dt.key')
        .eq(0)
        .should('contain', 'Employer Name')
        .next('dd')
        .should('contain', user.employerName)

      cy.get('a#consentButton')
        .should('contain', 'This information is accurate')
        .click()

      // CONFIRMATION PAGE
      cy.url().should('contain', '/confirmation')
      cy.get('h1').should('contain', 'Success!')
      cy.get('h1')
        .next('p')
        .should('contain', `Good job, ${getFirstName(user.name)}!`)
    })
  })
})
