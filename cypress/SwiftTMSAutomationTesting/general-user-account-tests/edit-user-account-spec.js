/// <reference types="cypress" />

import { EditMyAccountPage } from'../page-objects/edit-user-account-page.js'

const recommendedCompaniesURL= 'company/list/recommended'
const registeredUserName= Cypress.env('username')
const registeredPW= Cypress.env('password')


describe('Edit account testing', function () {
    beforeEach(function () {
       cy.login(registeredUserName,registeredPW).then(() => {
        cy.visit(recommendedCompaniesURL)
        EditMyAccountPage.shouldbeDisplayed()

       })
        
    })   

    it('must enter Name field', function () {
        EditMyAccountPage.clearName()
        EditMyAccountPage.submit()
        EditMyAccountPage.verifyErrorMessage('String must contain at least 3 character(s)')
    })

    it('require a new valid Name', function () {
        const invalidName= 'ab'
        EditMyAccountPage.inputName(invalidName)
        EditMyAccountPage.submit()
        EditMyAccountPage.verifyErrorMessage('String must contain at least 3 character(s)')
    
    })

    it('successfully updated a new valid Name', function () {
        const validName= 'Tonny'
        EditMyAccountPage.inputName(validName)
        EditMyAccountPage.submit()
        EditMyAccountPage.verifySuccessMessage('User updated successfully')
        EditMyAccountPage.verifyNewName(validName)
    
    })


    it('must enter Username field',  function() {
        EditMyAccountPage.clearUsername()
        EditMyAccountPage.submit()
        EditMyAccountPage.verifyErrorMessage('String must contain at least 3 character(s)')
        
    })

    it('require a new valid Username', function () {
        const invalidUserName= 'A1'
        EditMyAccountPage.inputUsername(invalidUserName)
        EditMyAccountPage.submit()
        EditMyAccountPage.verifyErrorMessage('String must contain at least 3 character(s)')

    })

    it('successfully updated a new valid Username', function () {
        const newUserName= '123testing'
        EditMyAccountPage.inputUsername(newUserName)
        EditMyAccountPage.submit()
        EditMyAccountPage.verifySuccessMessage('User updated successfully')
        cy.contains('Logout').click()
        
        // try log in  with the new Username
        cy.login(newUserName,registeredPW)
        EditMyAccountPage.shouldbeDisplayed()
        EditMyAccountPage.verifyTextInUserNameField(newUserName)

        // Edit it back to the previour username, so the testing login details are not changed. 
        EditMyAccountPage.inputUsername(registeredUserName)
        EditMyAccountPage.submit()
        EditMyAccountPage.verifySuccessMessage('User updated successfully')

    })


    it('Require a new valid password', function () {
        const invalidPW= '12'
        EditMyAccountPage.inputNewPassword(invalidPW)
        EditMyAccountPage.submit()
        EditMyAccountPage.verifyErrorMessage('String must contain at least 3 character(s)')
    })

    it('successfully updated a new valid password', function () {
        const newPW= '123testing'
        EditMyAccountPage.inputNewPassword(newPW)
        EditMyAccountPage.submit()
        EditMyAccountPage.verifySuccessMessage('User updated successfully')
        cy.contains('Logout').click()

        // try log in with the new PW
        cy.login(registeredUserName, newPW)

        //Edit it back to the previous PW, so the testing login details are not changed. 
        EditMyAccountPage.shouldbeDisplayed()
        EditMyAccountPage.inputNewPassword(registeredPW)
        EditMyAccountPage.submit()
        EditMyAccountPage.verifySuccessMessage('User updated successfully')

    })
})
   

 

















    






        




