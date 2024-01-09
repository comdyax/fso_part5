describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.get('h1').should('contain', 'Login to see application')
    cy.get('#loginForm').parent().as('form')
    cy.get('@form')
      .should('contain', 'username')
      .and('contain', 'password')
      .and('contain', 'login')
    cy.get('#username')
    cy.get('#password')
  })
})