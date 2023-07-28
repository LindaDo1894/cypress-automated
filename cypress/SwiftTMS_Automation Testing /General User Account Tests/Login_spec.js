/// <reference types="cypress" />

import { Login_Page } from '../pageObjects/login_page.js'

describe('Login to SwiftTMS', function () {

    beforeEach(()=> {
        cy.visit('api/auth/signin?callbackUrl=https%3A%2F%2Fwww.swifttms.com.au%2F')   
    })
 
    it('must enter the username', function () {    
        Login_Page.emptyUsername()
        Login_Page.typePassword(Cypress.env('password')) 
        Login_Page.submitSignIn()   
        Login_Page.shouldBeDisplayedError()   
             
    })
    

    it('must enter the password ', function () {
        Login_Page.typeUsername(Cypress.env('username'))
        Login_Page.emptyPassword()
        Login_Page.submitSignIn()
        Login_Page.shouldBeDisplayedError()
       
    })
    
    it('require a valid username ', function () {
        Login_Page.typeUsername('ABC')
        Login_Page.typePassword(Cypress.env('password'))
        Login_Page.submitSignIn()
        Login_Page.shouldBeDisplayedError()
    })

    it('require a valid password', function () {
        Login_Page.typeUsername(Cypress.env('username'))
        Login_Page.typePassword('1234')
        Login_Page.submitSignIn()
        Login_Page.shouldBeDisplayedError()
    })
    
    it('Login successfully and redirect to the Recommended page', function () {
        Login_Page.typeUsername(Cypress.env('username'))
        Login_Page.typePassword(Cypress.env('password'))
        Login_Page.submitSignIn()
        cy.url().should('contain','recommended')
    })
    
})
   

