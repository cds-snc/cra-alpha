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

const editValue = (cy, rowNum, id, type, originalValue, newValue) => {
  cy.get('dd.value')
    .eq(rowNum)
    .should('contain', originalValue)
    .next('dd.action')
    .find('a')
    .click()

  cy.url().should('contain', `/edit/${id}`)

  if (type === 'radio') {
    cy.get(`input[value="${originalValue}"]`).should('be.checked')
    cy.get(`input[value="${newValue}"]`).check()
  } else {
    cy.get(`${type}#${id}`)
      .should('have.value', originalValue)
      .clear()
      .type(newValue)
  }

  cy.get('form button')
    .should('contain', 'Save')
    .click()
}

describe('Full run through with edits', function() {
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

    cy.fixture('user_edits').as('userEdits')

    cy.fixture('user').then(user => {
      cy.get('form label').should('have.attr', 'for', 'name')
      cy.get('form input#name')
        .type(user.name)
        .should('have.value', user.name)
      cy.get('form button')
        .should('contain', 'Log in')
        .click()

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
