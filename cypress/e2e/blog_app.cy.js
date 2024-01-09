describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'John Coltrane',
      username: 'The Trane',
      password: 'TransitionJapanConcerts'
    }
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

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'The Trane', password: 'TransitionJapanConcerts' })
      })

      it('A blog can be created', function () {
        cy.contains('new blog').click()
        cy.get('#title').type('How to play standards')
        cy.get('#author').type('Someone who likes music')
        cy.get('#url').type('www.thewaytojazz.io')
        cy.get('#create-blog').click()

        cy.contains('title: How to play standards')
        cy.contains('author: Someone who likes music')
        cy.get('#blogs').parent().find('.blogDiv').as('blogDiv')
        cy.get('@blogDiv').parent().find('.defaultValues').as('defaultValues')
        cy.get('@defaultValues')
          .should('not.contain', 'url: www.thewaytojazz.io')

        cy.get('.confirmation')
          .should('contain', 'a new blog: How to play standards by Someone who likes music was added.')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
      })
    })


  })
})

