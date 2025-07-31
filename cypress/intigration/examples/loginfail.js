/// <reference types="cypress" />

describe("Ecommerce Smoke Suite", () => {
    it('login failed', () => {
        cy.loginShouldFail()
    })
})