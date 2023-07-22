/// <reference types="cypress" />

import LoginPage from "/Users/linhdo/Desktop/Cypress Practice 1/cypress/SwiftTMS project/PageObjects/Loginpage.js"

describe('Login to SwiftTMS', function () {
    beforeEach(()=> {
        const logIn= new LoginPage()
        cy.visit('api/auth/signin?callbackUrl=https%3A%2F%2Fwww.swifttms.com.au%2F')
        logIn.getUsername().type(Cypress.env('username')).should('be.visible')
        logIn.getPassword().type(Cypress.env('password'))
         
    })
 
    it('username is required', function () {  
      
        const logIn= new LoginPage()       
        logIn.getUsername().clear()
        logIn.getSigninbutton().click()
        logIn.getErrormessage().should('be.visible').and('have.text', 'Sign in failed. Check the details you provided are correct.') 
        cy.url().should('include', 'error=CredentialsSignin')        
    })

    it('password is required', function () {
    
        const logIn= new LoginPage() 
        logIn.getPassword().clear()
        logIn.getSigninbutton().click()
        logIn.getErrormessage().should('be.visible').and('have.text', 'Sign in failed. Check the details you provided are correct.') 
        cy.url().should('include', 'error=CredentialsSignin')  
    })
    
    it('require valid username and password', function () {
        const logIn= new LoginPage()  
      
        logIn.getUsername().clear().type('linda').should('be.visible')
        logIn.getSigninbutton().click()
        logIn.getErrormessage().should('be.visible').and('have.text', 'Sign in failed. Check the details you provided are correct.')
        cy.url().should('include', 'error=CredentialsSignin')  

        logIn.getPassword().clear().type('abc')
        logIn.getSigninbutton().click()
        logIn.getErrormessage().should('be.visible').and('have.text', 'Sign in failed. Check the details you provided are correct.')
        cy.url().should('include', 'error=CredentialsSignin')  
    })
    
    it('navigate to SwiftTMS website on successful login', function () {
      
        const logIn= new LoginPage()
        logIn.getSigninbutton().should('not.have.attr', 'href')
        logIn.getSigninbutton().click()
        cy.url().should('contain','recommended')
    })
    
})
   

