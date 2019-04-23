const { getFirstName } = require('../../src/api.js')

const checkTableRows = (cy, rows) => {
  rows.map((row, index) => {
    cy.get('dt.key')
      .eq(index)
      .should('contain', row.key)
      .next('dd')
      .should('contain', row.value)
  })
}

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

      checkTableRows(cy, [
        { key: 'Name', value: user.name },
        { key: 'Mailing address', value: user.address },
      ])

      cy.get('a.buttonLink')
        .should('contain', 'Continue')
        .click()

      // YOUR FAMILY PAGE
      cy.get('h1').should('contain', 'You and your family')

      checkTableRows(cy, [
        { key: 'Marital status', value: user.maritalStatus },
        { key: 'Number of children', value: user.children },
      ])

      cy.get('a.buttonLink')
        .should('contain', 'Continue')
        .click()

      // YOUR INCOME PAGE
      cy.get('h1').should('contain', 'Your income')

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
