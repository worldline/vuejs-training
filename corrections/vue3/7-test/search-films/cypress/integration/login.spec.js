// https://docs.cypress.io/api/introduction/api.html

describe('Authentication behavior', () => {
  it('should redirect to login form when visiting app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Authentication')
  })

  it('should login correctly', () => {
    cy.get("#email").type("cypress@test.com")
    cy.get("#psw").type("test1234")
    cy.get("button[type='submit']").click()
    cy.get("#session-info").contains("Connecté en tant que John Smith")
  })
})
