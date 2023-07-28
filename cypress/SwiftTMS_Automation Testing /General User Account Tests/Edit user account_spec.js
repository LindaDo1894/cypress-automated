/// <reference types="cypress" />

import {Edit_My_Account_Dialog} from'../pageObjects/edit user account_dialog.js'
const Recommended_Companies_URL= 'company/list/recommended'
const registeredUserName= Cypress.env('username')
const registeredPW= Cypress.env('password')


describe('Edit account testing', function () {
    beforeEach(function () {
       cy.Login(registeredUserName,registeredPW).then(() => {
        cy.visit(Recommended_Companies_URL)
        Edit_My_Account_Dialog.shouldbedisplayed()

       })
        
    })   

    it('must enter Name field', function () {
        Edit_My_Account_Dialog.emptyName()
        Edit_My_Account_Dialog.clickSubmit()
        Edit_My_Account_Dialog.displayedErrorMessage()
    })

    it('require a new valid Name', function () {
        const invalidName= 'ab'
        Edit_My_Account_Dialog.typeName(invalidName)
        Edit_My_Account_Dialog.clickSubmit()
        Edit_My_Account_Dialog.displayedErrorMessage()
    
    })

    it('successfully updated a new valid Name', function () {
        const validName= 'Tonny'
        Edit_My_Account_Dialog.typeName(validName)
        Edit_My_Account_Dialog.clickSubmit()
        cy.wait(4000)
        Edit_My_Account_Dialog.displayedSuccessMessage()
    
        Edit_My_Account_Dialog.displayedNewName(validName)
    
    })


    it('must enter Username field',  function() {
        Edit_My_Account_Dialog.emptyUsername()
        Edit_My_Account_Dialog.clickSubmit()
        Edit_My_Account_Dialog.displayedErrorMessage()
        
    })

    it('require a new valid Username', function () {
        const invalidUserName= 'A1'
        Edit_My_Account_Dialog.typeUsername(invalidUserName)
        Edit_My_Account_Dialog.clickSubmit()
        Edit_My_Account_Dialog.displayedErrorMessage()

    })

    it('successfully updated a new valid Username', function () {
        const newUserName= '123testing'
        Edit_My_Account_Dialog.typeUsername(newUserName)
        Edit_My_Account_Dialog.clickSubmit()
        cy.wait(4000)
        Edit_My_Account_Dialog.displayedSuccessMessage()
        cy.contains('Logout').click()
        
        // try log in  with the new Username
        cy.Login(newUserName,registeredPW)
        Edit_My_Account_Dialog.shouldbedisplayed()
        Edit_My_Account_Dialog.getTextUserNameField(newUserName)

        // Edit it back to the previour username, so the testing login details are not changed. 
        Edit_My_Account_Dialog.typeUsername(registeredUserName)
        Edit_My_Account_Dialog.clickSubmit()
        cy.wait(4000)
        Edit_My_Account_Dialog.displayedSuccessMessage()

    })


    it('Require a new valid password', function () {
        const invalidPW= '12'
        Edit_My_Account_Dialog.typeNewPassword(invalidPW)
        Edit_My_Account_Dialog.clickSubmit()
        cy.wait(4000)
        Edit_My_Account_Dialog.displayedErrorMessage()
    })

    it('successfully updated a new valid password', function () {
        const newPW= '123testing'
        Edit_My_Account_Dialog.typeNewPassword(newPW)
        Edit_My_Account_Dialog.clickSubmit()
        cy.wait(5000)
        Edit_My_Account_Dialog.displayedSuccessMessage()
        cy.contains('Logout').click()

        // try log in with the new PW
        cy.Login(registeredUserName, newPW)

        //Edit it back to the previous PW, so the testing login details are not changed. 
        Edit_My_Account_Dialog.shouldbedisplayed()
        Edit_My_Account_Dialog.typeNewPassword(registeredPW)
        Edit_My_Account_Dialog.clickSubmit()
        cy.wait(5000)
        Edit_My_Account_Dialog.displayedSuccessMessage()

    })
})
   

 

















    






        




