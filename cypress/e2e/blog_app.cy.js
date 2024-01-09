describe('Blog app', function () {
  beforeEach(function () {
    //empty database
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    // create a user to backend
    const user = {
      name: 'John Coltrane',
      username: 'The Trane',
      password: 'TransitionJapanConcerts'
    }
    //post user to database
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
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

  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('The Trane')
      cy.get('#password').type('TransitionJapanConcerts')
      cy.get('#login-button').click()

      cy.contains('John Coltrane is logged in')

    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('The Trane')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'John Coltrane logged in')
    })

  })
})

