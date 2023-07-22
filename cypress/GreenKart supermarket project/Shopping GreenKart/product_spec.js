/// <reference types="cypress" />
import Shoppingpage from '/Users/linhdo/Desktop/Cypress Practice 1/cypress/integration/Shopping GreenKart/PageObjects/ShoppingPage.js'
import Topdeals from'/Users/linhdo/Desktop/Cypress Practice 1/cypress/integration/Shopping GreenKart/PageObjects/TopDealsPage.js'

describe('Test shopping page', function (){
    beforeEach(function () {

        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
    })

  it('Search and validate formats product', function () {
        let shopping= new Shoppingpage() 
        shopping.getSearch().type('ap')
        cy.wait(3000)
        cy.get('div.products > .product').should('be.visible').and('have.length', 3)
        shopping.getSearch().clear()
        cy.get('.products:visible').each((product, index, list) => {
           
            cy.get(product).within(()=> {
                cy.get('.product-image > img').should('exist')
                cy.get('.product-name').should('exist')
                cy.get('.product-price').should('exist')
                cy.get('.stepper-input > .decrement').should('exist')
                cy.get('.stepper-input > .increment').should('exist')
                cy.get('.stepper-input > .quantity').should('exist').and('have.attr', 'value','1')
                cy.get('.product-action > button').should('exist').then((el)=> {
                    const text= el.text()
                    expect(text).to.include('ADD')
                })
            })                   
            })           
        });
    
    it('Add items to cart and Cart link', function () {
        let shopping= new Shoppingpage() 
        shopping.getALLProduct().eq(1).find('.product-action > [type="button"]').click()
        shopping.getALLProduct().eq(2).then((el) => {
            //ask cypress to execute the request, so need to use `cy.get()`
            cy.get(el).find('.stepper-input > .increment').dblclick()
            cy.get(el).find('.stepper-input > .quantity').then((number) => {
                const a= number.prop('value')
                expect(a).to.be.equal('3')
            })

            cy.get(el).find('.stepper-input > .decrement').click()
            cy.get(el).find('.stepper-input > .quantity').then((number) => {
                const a= number.prop('value')
                expect(a).to.be.equal('2')
            })
            cy.get(el).find('.product-action > [type="button"]').click()

            })
//after adding all items, test `Items` and `Price` elements: be visible and >0
        cy.get(':nth-child(1) > :nth-child(3) > strong').should('be.visible').then((itemNumber) => {
                const item= Number(itemNumber.text())
                expect(item).to.equal(2) 
        }) 
        cy.get(':nth-child(2) > :nth-child(3) > strong').should('be.visible').then((price)=> {
            const total= Number(price.text())
            expect(total).to.be.above(0)
        })

        shopping.getCartLink().should('have.attr', 'href')
        shopping.getCartLink().click()
        cy.get('.cart-preview').contains('CHECKOUT').click()
        cy.url().should('include', 'cart')
    })
    

    it('Validate top deals links', function () {
        let shopping= new Shoppingpage()  
        shopping.getTopDealsLink().should('have.attr', 'href') 
        shopping.getTopDealsLink().click()
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers')
        cy.url().should('include', 'offers')
        })
    
    it('Validate flight booking link', function () {
        let shopping= new Shoppingpage()
        shopping.getFlightBookingLink().should('have.attr', 'href')
        shopping.getFlightBookingLink().click()
        cy.visit('https://rahulshettyacademy.com/dropdownsPractise/')
        cy.url().should('include','dropdownsPractise')
    })


       
})
    
        

        
        
        
        
       


    

        
  //
  //                         






     
    
    

 


    
/* NOTE: 
 +) in most cases, .should() yields the same subject it was given from the previous command
        // in the case the chainer 'have.attr', 'href' changes the subject. 
        // the yielded subject is #/offers , not the subject from shopping.getTopDealsLink()
        // Can't chain '.click()` after should command in this case 

+)  2nd way to test the new tab when clicking Top Deals link
       ->  instead of click on the link, get value of the `href` attr
        shopping.getTopDealsLink().then((el)=> {
            const link= el.prop('href')
            cy.visit(link)
            cy.url().should('include', 'offers')
            })
+)





*/