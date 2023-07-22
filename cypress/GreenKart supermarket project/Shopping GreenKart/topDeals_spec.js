/// <reference types="cypress" />
import Topdeals from'/Users/linhdo/Desktop/Cypress Practice 1/cypress/integration/Shopping GreenKart/PageObjects/TopDealsPage.js'

describe('Test topdeals page', function (){
    beforeEach(function () {       
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers')
        
    })
it('Search function and validate the table', function () {  
    let deals= new Topdeals()
    deals.getSearch().type('to')
    deals.getTableColumn().should('have.length', 3)
    cy.get('table.table-bordered tbody > tr ').should('have.length', 2)
    cy.get('tbody  > tr > td:nth-child(1)').each((el, index, list) => {
            const itemName= el.text()
            if(itemName.includes('Tomato')){
                cy.get(el).next().then((price) => {
                    expect(Number(price.text())).to.equal(37)
                })
                cy.get('tbody  > tr > td:nth-child(3)').eq(index).then((discountPrice) => {
                    expect(Number(discountPrice.text())).to.equal(26)
                })
            }
        })  
})

it('Page size and pagination', function () {
    let deals= new Topdeals()
    cy.get('#page-menu option').should('have.length', '3')
    deals.getPageSize().select('5').should('have.value', '5')
    deals.getPageSize().select('10').should('have.value', '10')
    deals.getPageSize().select('20').should('have.value', '20')
    
    deals.getPagination().contains('1').click() 
})
            
    })
