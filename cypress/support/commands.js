// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getBySel', (selector, ...args)=>{
  return cy.get(`[data-cy="${selector}"]`, ...args);
});

Cypress.Commands.add('login', (username, password) => {
  cy.visit('http://localhost:8080/#/');

  cy.getBySel('nav-link-login').click();

  // attendre que les champs soient activés
  cy.getBySel('login-input-username').should('not.be.disabled');
  cy.getBySel('login-input-password').should('not.be.disabled');

  // remplir les champs
  cy.getBySel('login-input-username').clear().type(username);
  cy.getBySel('login-input-password').clear().type(password);

  cy.getBySel('login-submit').click();

  cy.url().should('include', '/#/');
});
