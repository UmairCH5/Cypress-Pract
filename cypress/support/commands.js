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
require('cypress-downloadfile/lib/downloadFileCommand')

Cypress.Commands.add('login', (email=Cypress.env('defaultEmail'), password=Cypress.env('defaultPassword')) => {
    // cy.visit('https://demo.codenbox.com/')
    // cy.contains('Login').click({force: true})
    cy.get('#input-email').clear().type(email);
    cy.get('#input-password').clear().type(password);
    //click the login button
    cy.get('#form-login > .text-end > .btn').click();
})

Cypress.Commands.add('loginShouldFail', (email=Cypress.env('invalidEmail'), password=Cypress.env('invalidPassword')) => {
    //visit the login page
    cy.visit('https://demo.codenbox.com/');
    cy.url().should('include', 'demo')
    cy.contains('Login').click({force: true})

    //Type the email and password
    cy.get('#input-email').clear().type(email);
    cy.get('#input-password').clear().type(password);
    //click the login button
    cy.get('#form-login > .text-end > .btn').click();
    cy.get(".alert", { timeout: 5000 })
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal(
          "Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour."
        );
      });
})