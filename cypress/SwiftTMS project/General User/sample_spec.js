/// <reference types="cypress" />

import MyPurchases from '../PageObjects/My Purchases.js'
import { PurchaseService } from '../services/purchase-service.js'
import 'cypress-xpath'

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
        var token = cy.getCookie('__Secure-next-auth.session-token');
        const purchasePage= new MyPurchases()
        PurchaseService.getPurchase(token).then((data) => {
            cy.log(data)
            cy.log(data[0].result.data.json[0].id);
            var code = data[0].result.data.json[0].companyCode.toString()
            cy.log(data[0].result.data.json[0].companyCode);
            cy.log(data[0].result.data.json[0].quantity);
            cy.log(data[0].result.data.json[0].price);
            cy.log(data[0].result.data.json[0].total);
            cy.log(data[0].result.data.json[0].date);
            //Company Code
            purchasePage.VerifyCode(code)
            //Number Shares Purchased
            //Date Purchased
            //Purchased Price
            //Total
            //Actions
          })

       
        purchasePage.getTitle().should('have.text', 'List of Purchases')
        purchasePage.getAddPurchaseButton().should('be.visible')
    
        purchasePage.getColumnInTable().should('be.visible').and('have.length', 6)
        //Company Code
        //Number Shares Purchased
        //Date Purchased
        //Purchased Price
        //Total
        //Actions
    })
  
})

   





