/// <reference types="cypress" />

import { LoginPage } from '../page-objects/login-page.js'

describe('Login to SwiftTMS', function () {

    beforeEach(()=> {
        cy.visit('api/auth/signin?callbackUrl=https%3A%2F%2Fwww.swifttms.com.au%2F')   
    })
 
    it('must enter the username', function () {    
        LoginPage.clearUsername()
        LoginPage.inputPassword(Cypress.env('password')) 
        LoginPage.submit()   
        LoginPage.errorShouldBeDisplayed('Sign in failed. Check the details you provided are correct.')   
             
    })
    

    it('must enter the password ', function () {
        LoginPage.inputUsername(Cypress.env('username'))
        LoginPage.clearPassword()
        LoginPage.submit()
        LoginPage.errorShouldBeDisplayed('Sign in failed. Check the details you provided are correct.')
       
    })
    
    it('require a valid username ', function () {
        LoginPage.inputUsername('ABC')
        LoginPage.inputPassword(Cypress.env('password'))
        LoginPage.submit()
        LoginPage.errorShouldBeDisplayed('Sign in failed. Check the details you provided are correct.')
    })

    it('require a valid password', function () {
        LoginPage.inputUsername(Cypress.env('username'))
        LoginPage.inputPassword('1234')
        LoginPage.submit()
        LoginPage.errorShouldBeDisplayed('Sign in failed. Check the details you provided are correct.')
    })
    
    it('Login successfully and redirect to the Recommended page', function () {
        LoginPage.inputUsername(Cypress.env('username'))
        LoginPage.inputPassword(Cypress.env('password'))
        LoginPage.submit()
        cy.url().should('contain','recommended')
    })
    
})
   

