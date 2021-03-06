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

const logIn = (cy, user) => {
  cy.get('h1').should('contain', 'Log in to see your tax-filing information')

  cy.get('form label').should('have.attr', 'for', 'login')
  cy.get('form input#login')
    .type(user.name)
    .should('have.value', user.name)
  cy.get('form button')
    .should('contain', 'Log in')
    .click()
}

module.exports = {
  checkTableRows,
  editValue,
  logIn,
}
