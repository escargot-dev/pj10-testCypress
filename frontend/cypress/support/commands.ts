/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
Cypress.Commands.add('getBySel', (selector: string, ...args) => {
  return cy.get(`[data-cy="${selector}"]`, ...args);
});

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('http://localhost:8080/#/');

  cy.getBySel('nav-link-login').click();

  
  cy.getBySel('login-input-username').should('not.be.disabled').clear().type(username);
  cy.getBySel('login-input-password').should('not.be.disabled').clear().type(password);

  cy.getBySel('login-submit').click();

  cy.url().should('include', '/#/');
});

Cypress.Commands.add('apiLogin', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8081/login',
    body: {
      email: 'test2@test.fr',
      password: 'testtest'
    }
  }).then((resp) => {
    window.localStorage.setItem('token', resp.body.token);
  });
});
