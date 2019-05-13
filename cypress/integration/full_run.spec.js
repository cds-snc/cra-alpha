const { getFirstName } = require('../../src/api.js')
const { checkTableRows, logIn } = require('../utils.js')

describe('Full run through', function() {
  it('Goes from the start of the service to the confirmation page', function() {
    cy.visit('/')

    // WELCOME PAGE
    cy.get('h1').should('contain', 'Claim tax benefits (CTB)')
    cy.get('main a')
      .should('contain', 'Get started')
      .click()

    // LOGIN PAGE
    cy.url().should('contain', '/login')

    cy.fixture('user').then(user => {
      logIn(cy, user)

      // INTRODUCTION PAGE
      cy.url().should('contain', '/introduction')
      cy.get('h1').should('contain', `Hi, ${getFirstName(user.name)}`)

      /* 

      cy.get('h2')
        .first()
        .should('contain', 'About you')

      Object.values(user).forEach(value => {
        cy.get('dd.value').should('contain', value)
      })

      */

      cy.get('a.buttonLink')
        .should('contain', 'Get started')
        .click()

      // ABOUT YOU PAGE
      cy.get('h1').should('contain', 'About you')

      checkTableRows(cy, [
        { key: 'Name', value: user.name },
        { key: 'Mailing address', value: user.address },
        { key: 'Marital status', value: user.maritalStatus },
        { key: 'Number of children', value: user.children },
      ])

      cy.get('a.buttonLink')
        .should('contain', 'File my taxes')
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
