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

    cy.get('form label').should('have.attr', 'for', 'name')
    cy.get('form input#name')
      .type('Avril')
      .should('have.value', 'Avril')
    cy.get('form button')
      .should('contain', 'Log in')
      .click()

    // DASHBOARD PAGE
    cy.url().should('contain', '/dashboard')
    cy.get('h1').should('contain', 'Hi, Avril')

    cy.get('h2')
      .first()
      .should('contain', 'About you')
    cy.get('dl[title="About you"]')
      .find('dd')
      .first()
      .should('contain', 'Avril Douglas Campbell')

    cy.get('a.buttonLink')
      .should('contain', 'Get started')
      .click()

    // CONFIRMATION PAGE
    cy.url().should('contain', '/confirmation')
    cy.get('h1').should('contain', 'Success!')
    cy.get('h1')
      .next('p')
      .should('contain', 'Good job, Avril!')
  })
})
