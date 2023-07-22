/// <reference types="cypress" />
import Top200 from "/Users/linhdo/Desktop/Cypress Practice 1/cypress/SwiftTMS project/PageObjects/Top 200 companies.js"

describe('Testing top 200 companies page', function () {
    beforeEach(function () {
        cy.login().then(() => {
            cy.visit('metrics/top200')
            cy.wait(5000)
            cy.fixture('Top200').then((data) => {
                this.data= data
            })
        })
    })
    it('Display a title and a table', function () {
        const top200Page= new Top200()
        top200Page.getPageTitle().should('have.text', 'Top 200 Companies').and('be.visible')
        top200Page.getColumnName().should('have.length', 10).and('be.visible')
        this.data.columnName.forEach((text) => {
            cy.Validate_table_content(text)
        })
        top200Page.getRows().should('have.length', 200)
    })

    it('Validate View Analytics link', function () {
        const top200Page= new Top200()
        // test `View analytics`link is included in each company
        top200Page.getViewAnalyticLink().should('have.length', 200).should('have.attr', 'href')
        top200Page.getViewAnalyticLink().each(($link, index, list) => {
            const viewLink= $link.prop('href')
            expect(viewLink).to.include('company/analytics?')
        })
        // test links of 5 companies to make sure it will redirect to the correct page for that company on ` Company Analytics` page.   
        this.data.company.forEach((companyCode) => {
            cy.validate_ViewAnalytics(companyCode)
        })
    })
// ***** still Solving
   it('Validate ranking for 200 companies', function () {
        cy.get('tbody tr td:nth-child(3)').each(($el, index, list) => {
            const earningYield= parseFloat(el.text())
            // return each number thoai , not an rray 

            // using sort(compareFn(a,b)) in JS to sort the elements  of an array in place.
        })
    })


} )