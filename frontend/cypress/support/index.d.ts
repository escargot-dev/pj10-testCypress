/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    getBySel(selector: string, ...args: any[]): Chainable<JQuery<HTMLElement>>;
    login(username: string, password: string): void;
    apiLogin(): Chainable<void>;
  }
}
