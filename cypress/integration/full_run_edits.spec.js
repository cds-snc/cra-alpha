const { getFirstName } = require('../../src/api.js')
const { checkTableRows, editValue, logIn } = require('../utils.js')

describe('Full run through with edits', function() {
  it('updates each editable field', function() {
    cy.fixture('user_edits').as('userEdits')

    cy.visit('/')

    // WELCOME PAGE
    cy.get('h1').should('contain', 'Claim online benefits ready access (COBRA)')
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

      // EDIT FIRST NAME
      editValue(cy, 0, 'name', 'input', user.name, this.userEdits.name)
      // EDIT ADDRESS
      editValue(cy, 1, 'address', 'textarea', user.address, this.userEdits.address)

      cy.url().should('contain', '/about-you')

      // CHECK FOR NEW VALUES
      checkTableRows(cy, [
        { key: 'Name', value: this.userEdits.name },
        { key: 'Mailing address', value: this.userEdits.address },
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

      // EDIT MARITAL STATUS
      editValue(cy, 0, 'maritalStatus', 'radio', user.maritalStatus, this.userEdits.maritalStatus)
      // EDIT CHILDREN
      editValue(cy, 1, 'children', 'input', user.children, this.userEdits.children)

      cy.url().should('contain', '/your-family')

      // CHECK FOR NEW VALUES
      checkTableRows(cy, [
        { key: 'Marital status', value: this.userEdits.maritalStatus },
        { key: 'Number of children', value: this.userEdits.children },
      ])
    })
  })
})
