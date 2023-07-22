/// <reference types="cypress" />
import RecommendedCompaniesPage from "/Users/linhdo/Desktop/Cypress Practice 1/cypress/SwiftTMS project/PageObjects/Recommended Companies page.js"

describe('Testing Recommended Companies Page', function () {
    beforeEach(function () {
        cy.login().then(() => {
            cy.visit('company/list/recommended')
            cy.wait(6000)
            cy.fixture('ReCompanies').then(function(data) {
                this.data= data 
            })
        })  
    })
// Table testing
    it("Displaying a table of financial indicators", function () {
        const reCompany= new RecommendedCompaniesPage()
        reCompany.ColumnName().should('be.visible').and('have.length', 10)
        this.data.columnName.forEach((eachContent) => {
            cy.Validate_table_content(eachContent)
        })
    })

    it('Link is included in ViewAnalytics', function () {
        const reCompany= new RecommendedCompaniesPage()
        reCompany.ViewAnalyticsLink().should('have.attr', 'href')
        reCompany.ViewAnalyticsLink().each((el, index, list) => {
            const url= el.prop('href')
            expect(url).to.include('/company/analytics?')
        }) 
        this.data.company.forEach((Code) => {
            cy.viewAnalytics(Code)
        })
    }) 
       // Testing data in the table to make sure all companies on the table are recommended by admin.
       // Planning: based on the Admin website -> create a recommended company  test data in fixture folder 
      
    it('Validate displayed companies on the table', function () {
          const reCompany= new RecommendedCompaniesPage()
          this.data.recommended_by_Admin.forEach((code) => {
            cy.Validate_the_recommendedlist(code)
          }) 
    })

// Search Function Testing
    it('Search a company code that is NOT in the recommended list', function () {
            const reCompany= new RecommendedCompaniesPage()
            reCompany.SearchArea().type('A12{enter}')
            cy.wait(4000)
            cy.get('table > tbody > tr').should('have.length', 0)
    })

    it('Search a company name that is NOT in the recommended list', function() {
            const reCompany= new RecommendedCompaniesPage()
            reCompany.SearchArea().type('Tesla{enter}')
            cy.wait(4000)
            cy.get('table > tbody > tr').should('have.length', 0)
    })

    it('Search successfully a valid company CODE', function() {
            
            const reCompany= new RecommendedCompaniesPage()
            reCompany.SearchArea().type('BHP{enter}')
            cy.wait(4000)
            cy.get('table > tbody > tr').should('have.length', 1).and('be.visible')  
    })

    it('Search successfully a valid company NAME', function() {
            const reCompany= new RecommendedCompaniesPage()
            reCompany.SearchArea().type('elders{enter}')
            cy.wait(4000)
            cy.get('table > tbody > tr').should('have.length', 1).and('be.visible')
    })
             
// Pagination Testing
    it('Pagination Testing', function() {
            cy.get('.mantine-xi6t3z').should('have.attr','data-disabled', 'true')
            cy.get('[aria-current="page"]').should('have.text', '1')
    })
        // it just has only 1 page, so just write basic tests. 
})
        
           

        



            
        
            



    




