describe('connextion testing', () => {

  it('test connexion avec identifiants valides', () => {
    cy.login('test2@test.fr', 'testtest');
    cy.visit('http://localhost:8080/#/login')
    cy.getBySel('nav-link-login').click();
    cy.getBySel('login-form').submit();
    cy.getBySel('login-input-username').type('test2@test.fr')
    cy.getBySel('login-input-password').type('testtest')
    cy.getBySel('login-submit').click()
    cy.getBySel('nav-link-cart').should('be.visible');
  })
})