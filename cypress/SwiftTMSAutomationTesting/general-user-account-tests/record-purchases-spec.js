/// <reference types="cypress" />
import { MyPurchasesPage } from '../page-objects/record-my-purchases-page'

const username = Cypress.env("username")
const password = Cypress.env("password")

describe('testing the  purchases management function', function () {
    
    beforeEach(function () {
        //login and go to the My Purchases page.
        cy.login(username, password).then(() => {
            cy.visit('order/list')
        })
    })

    it('require a page title and add purchase button', function () {
        // page title name 'List of Purchases'
        // click on purchase button // dialog is displayed  
        MyPurchasesPage.verifyPageTile('List of Purchases')
        MyPurchasesPage.verifyAddPurchaseButton()
    })

    

    it('must require a valid Company Code', function () {
        //leave the Company Code empty. 
        MyPurchasesPage.verifyAddPurchaseButton ()
        MyPurchasesPage.verifyCompanyCodeValue ('{backspace}')
        MyPurchasesPage.verifyQuantityValue (5)
        MyPurchasesPage.verifyPriceValue (10)
        MyPurchasesPage.verifyTotalValue (5,10)
        MyPurchasesPage.verifySubmitButton ()
        MyPurchasesPage.verifyNotification ('Error')

    })

    it('must not leave the Quantity field empty', function () {
        // leave the  the Quantity field empty.
        MyPurchasesPage.verifyAddPurchaseButton ()
        MyPurchasesPage.verifyCompanyCodeValue ('ANZ')
        MyPurchasesPage.verifyQuantityValue ('{backspace}')
        MyPurchasesPage.verifyPriceValue (10)
        MyPurchasesPage.verifyTotalValue (0,10)
        MyPurchasesPage.verifySubmitButton ()
        MyPurchasesPage.verifyNotification ('Error')
    })

    it('must require a valid value in the Quantity field', function () {
        // enter INVALID number in the Quantity field (e.g. -5).
        MyPurchasesPage.verifyAddPurchaseButton ()
        MyPurchasesPage.verifyCompanyCodeValue ('ANZ')
        MyPurchasesPage.verifyQuantityValue (-5)
        MyPurchasesPage.verifyPriceValue (10)
        MyPurchasesPage.verifyTotalValue (-5,10)
        MyPurchasesPage.verifySubmitButton ()
        MyPurchasesPage.verifyNotification ('Error')
    })

    it('must not leave the Price field empty', function () {
        // leave the Price field empty. 
        
        MyPurchasesPage.verifyAddPurchaseButton ()
        MyPurchasesPage.verifyCompanyCodeValue ('ANZ')
        MyPurchasesPage.verifyQuantityValue (5)
        MyPurchasesPage.verifyPriceValue ('{backspace}')
        MyPurchasesPage.verifyTotalValue (5,0)
        MyPurchasesPage.verifySubmitButton ()
        MyPurchasesPage.verifyNotification ('Error')

    })

    it('must require a valid value in the Price field', function () {
        //enter INVALID number in the Price field (e.g. -10).
     
        MyPurchasesPage.verifyAddPurchaseButton ()
        MyPurchasesPage.verifyCompanyCodeValue ('ANZ')
        MyPurchasesPage.verifyQuantityValue (5)
        MyPurchasesPage.verifyPriceValue (-10)
        MyPurchasesPage.verifyTotalValue (5,-10)
        MyPurchasesPage.verifySubmitButton ()
        MyPurchasesPage.verifyNotification ('Error')
        
    })
    

    it('must not leave the Total field empty', function () {
        // leave the Total field empty. 
        MyPurchasesPage.verifyAddPurchaseButton ()
        MyPurchasesPage.verifyCompanyCodeValue ('ANZ')
        MyPurchasesPage.verifyQuantityValue (5)
        MyPurchasesPage.verifyPriceValue (10)
        MyPurchasesPage.verifyInvalidTotalValue('{backspace}')
        MyPurchasesPage.verifySubmitButton ()
        MyPurchasesPage.verifyNotification ('Error')

    })
    it('must require a valid value  in the Total field', function () {
       // enter INVALID numbver in the Total field (e.g., 0)
        MyPurchasesPage.verifyAddPurchaseButton()
        MyPurchasesPage.verifyCompanyCodeValue ('ANZ')
        MyPurchasesPage.verifyQuantityValue (5)
        MyPurchasesPage.verifyPriceValue (10)
        MyPurchasesPage.verifyInvalidTotalValue(0)
        MyPurchasesPage.verifySubmitButton ()
        MyPurchasesPage.verifyNotification ('Error')
    })
    
    it('sucessfully add a new purchase', function () {
        MyPurchasesPage.verifyAddPurchaseButton()
        MyPurchasesPage.verifyCompanyCodeValue ('ANZ')
        MyPurchasesPage.verifyQuantityValue (5)
        MyPurchasesPage.verifyPriceValue (10)
        MyPurchasesPage.verifyTotalValue(5,10)
        MyPurchasesPage.verifySubmitButton ()
        MyPurchasesPage.verifyNotification ('Success')
     
    })

    it('successfully edit the Company Code of an existing purchase record', function () {
        MyPurchasesPage.verifyEditButton(0)
        MyPurchasesPage.verifyCompanyCodeValue('FMG')
        MyPurchasesPage.verifySubmitButton ()
        MyPurchasesPage.verifyNotification ('Success')

    })

    it('successfully edit the Quantity Share Purchased of an existing purchase record', function () {
        MyPurchasesPage.verifyEditButton(0)
        MyPurchasesPage.verifyQuantityValue (10)
        MyPurchasesPage.verifySubmitButton ()
        MyPurchasesPage.verifyNotification ('Success')

    })
    it('successfully edit the Price Purchased of an existing purchase record', function () {
        MyPurchasesPage.verifyEditButton(0)
        MyPurchasesPage.verifyPriceValue (2)
        MyPurchasesPage.verifySubmitButton ()
        MyPurchasesPage.verifyNotification ('Success')
    })

    it('successfully edit the Total of an existing purchase record', function () {
        MyPurchasesPage.verifyEditButton(0)
        MyPurchasesPage.verifyPriceValue (300)
        MyPurchasesPage.verifySubmitButton ()
        MyPurchasesPage.verifyNotification ('Success')
    })

    it(' successfully delete an existing purchase record', function () {
        MyPurchasesPage.verifyEditButton(0)
        MyPurchasesPage.verifyDeleteButton()
        MyPurchasesPage.verifyDeleteMessage('Are you sure you would like to delete this purchase?')
        MyPurchasesPage.verifyDeleteButtonInTheMessage()
    })

})