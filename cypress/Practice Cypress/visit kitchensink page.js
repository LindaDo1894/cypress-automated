/// <reference types="cypress" />

describe('My first test suite', function () {
    it('Visits the Kitchen Sink', function () {
        cy.visit('https://example.cypress.io/')
        cy.contains('type').click()
        //write an assertion to make sure the new URL is the expected URL.
        cy.url().should('include', 'commands/actions')
        //verify the behavior of an element on the new page. 
        cy.get('[type="email"]').type('fake@email.com')
        cy.get('[type="email"]').should('have.value','fake@email.com')
    })
})