/// <reference types="cypress" />

import MyPurchases from '../PageObjects/My Purchases.js'


describe('Testing record purchases function', function () {
    beforeEach(function () { 
        cy.login().then(function () {
            cy.fixture('Purchase').then((data) => {
                this.data=data
            })
            cy.visit("order/list")
            cy.wait(4000)
            
        })
    })

    it("Validate Title, Table and `Add Purchase` button on the page", function () {
        const purchasePage= new MyPurchases()
        purchasePage.getTitle().should('have.text', 'List of Purchases')
        purchasePage.getAddPurchaseButton().should('be.visible')
    
        purchasePage.getColumnInTable().should('be.visible').and('have.length', 6)
        this.data.ColumnName.forEach((eachName) => {
            let result= 'false'
            purchasePage.getColumnInTable().each(($el, index, list) => {
                const text= $el.text()
                if(text === eachName) {
                    cy.wrap($el)
                    result= 'match'
                }
            }).then(() => {
                expect(result).to.equal('match')
            })
        })
    })
  

    it('Validate the "Add Purchase" button ', function() {
        const purchasePage= new MyPurchases()
        purchasePage.getAddPurchaseButton().click({force:true})
        cy.get('.mantine-Modal-content').should('be.visible')
        purchasePage.getNameOfField().should('have.length',5)
        this.data.FieldName.forEach((fieldName)=> {
            let result= 'false'
            purchasePage.getNameOfField().each(($el, index, list) => {
                const text= $el.text()
                if(text === fieldName) {
                    cy.wrap($el)
                    result= 'match'
                }
            }).then(() => {
                expect(result).to.equal('match')
            })
        })
        cy.contains('Cancel').should('be.visible')
        cy.contains('Submit').should('be.visible')
        purchasePage.CloseButton().should('be.visible')
    })
})
    
describe('Validate the Add New Purchase modal', function () {
    beforeEach(function () { 
        cy.login().then(function () {
            cy.fixture('Purchase').then((data) => {
                this.data=data
            })
            cy.visit("order/list")
            cy.wait(4000)
        })
        const purchasePage= new MyPurchases()
        purchasePage.getAddPurchaseButton().click({force:true})
        purchasePage.CompanyCodeField().type("BHP")
        purchasePage.QuantityField().clear().type("5")
        purchasePage.PriceField().clear().type("5")
        purchasePage.TotalField().should('have.value', '25.00')
        })

    it("Require a company code ", function () {
        const purchasePage= new MyPurchases()
        purchasePage.CompanyCodeField().clear()
        cy.contains('Submit').click()
        purchasePage.NotificationTitle().should('have.text', 'Error')
        purchasePage.NotificationBody().should('be.visible')
    })

    it("Require a Quantity value", function () {
        const purchasePage= new MyPurchases()
        purchasePage.QuantityField().clear()
        cy.contains('Submit').click()
        purchasePage.NotificationTitle().should('have.text', 'Error')
        purchasePage.NotificationBody().should('be.visible')
    })


    it("Require a Price value ", function () {
        const purchasePage= new MyPurchases()
        purchasePage.PriceField().clear()
        cy.contains('Submit').click()
        purchasePage.NotificationTitle().should('have.text', 'Error')
        purchasePage.NotificationBody().should('be.visible')

    })

    it("Require a Total value ", function () {
        const purchasePage= new MyPurchases()
        purchasePage.TotalField().clear()
        cy.contains('Submit').click()
        purchasePage.NotificationTitle().should('have.text', 'Error')
        purchasePage.NotificationBody().should('be.visible')
   })

   it("Require a VALID value for Quantity", function () {
        const purchasePage= new MyPurchases()
        purchasePage.QuantityField().clear().type(this.data.InvalidNumber)
        cy.contains('Submit').click()
        purchasePage.NotificationTitle().should('have.text', 'Error')
        purchasePage.NotificationBody().should('be.visible')
   })

   it("Require a VALID value for Price", function () {
        const purchasePage= new MyPurchases()
        purchasePage.PriceField().clear().type(this.data.InvalidNumber)
        cy.contains('Submit').click()
        purchasePage.NotificationTitle().should('have.text', 'Error')
        purchasePage.NotificationBody().should('be.visible')
   })

   it("Require a VALID value for TotalField", function () {
        const purchasePage= new MyPurchases()
        purchasePage.TotalField().clear().type(this.data.InvalidNumber)
        cy.contains('Submit').click()
        purchasePage.NotificationTitle().should('have.text', 'Error')
        purchasePage.NotificationBody().should('be.visible')


   })

   it("Successfully adding a purchase ", function () {
        const purchasePage= new MyPurchases()
        cy.contains('Submit').click()
        purchasePage.NotificationTitle().should('have.text', 'Success')
        purchasePage.NotificationBody().should('have.text', 'User added successfully')
        cy.get('tbody > tr').should('be.visible')

    })

})


describe(" Validate Edit function ", function () {
    beforeEach(function () { 
        cy.login().then(function () {
            cy.fixture('Purchase').then((data) => {
                this.data=data
            })
            cy.visit("order/list")
            cy.wait(4000)
        })
    })

    it(" Validate Edit button ", function() {
        const purchasePage= new MyPurchases()
        purchasePage.EditButton().should('be.visible')
        cy.get('tbody > tr > td').each(($el, index, list) => {
            const text= $el.text()
            if(text === 'BHP') {
                cy.wrap($el)
                purchasePage.EditButton().eq(index).click()
            }
        })
        cy.get('.mantine-Modal-content').should('be.visible')
        cy.contains('Delete').should('be.visible')
        cy.contains('Submit').should('be.visible')
        purchasePage.getNameOfField().should('have.length',5)
        this.data.FieldName.forEach((fieldName)=> {
            let result= 'false'
            purchasePage.getNameOfField().each(($el, index, list) => {
            const text= $el.text()
            if(text === fieldName) {
                cy.wrap($el)
                result= 'match'
            }
            }).then(() => {
                 expect(result).to.equal('match')
            })
         })
        purchasePage.CloseButton().click()
    })
        
})

/*

    it("Require a new valid code  ", function() {

        // Delete a current company code , then 'Submit' => Error message displays on the screen 

        //, then click cross sign to close the modal 
    })

    it(" Require a new valid Quantity value", function() {

        //Delete a quantity value , then Submit => Error message displays on the screen 
        // Enter a new INVALID Quantity value, then Submit => Error message displays on the screen 
        //, then click cross sign to close the modal
    })

    it("Require a new valid Price value ", function() {

        //Delete a price value  , then Submit=> Error message displays on the screen
        //Enter a new INVALID Price value, then Submit => Error message displays on the screen  
        //, then click cross sign to close the modal
    })
        
    it("Require a new valid Total value", function() {

        //Delete a Total value, then Submit=> Error message displays on the screen 
        //Enter a new INVALID Total value, then Submit => Error message displays on the screen 
        //, then click cross sign to close the modal
    })   


    it("Successfully edit a new Company code ", function () {

    })

    it("Successfully edit a new Quantity value ", function () {

        // `Total` value don't need to be updated too 

    })

    it("Successfully edit a new Price value ", function (){
        ////`Total` value don't need to be updated  too 

    })

    it("testing Delete button ", function () {

        // a message displays on the screen 
        //  Testing the messge ,
    })

*/
   





