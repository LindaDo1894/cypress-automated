/// <reference types="cypress" />


import CompanyAnalytics from '/Users/linhdo/Desktop/Cypress Practice 1/cypress/SwiftTMS project/PageObjects/Company Analytics page.js'

describe('Testing text on the page and Searching for a company', function () {
    beforeEach(function () {
        cy.login().then(() => {
            cy.fixture('CompAnalytics').then((data) => {
                this.data= data
            })
            cy.visit('company/analytics')
            cy.wait(5000)
        })
    })

    it('Require a title and an alert on the page', function () {
        const compAnalytics= new CompanyAnalytics()
        
        compAnalytics.getTitle().should('have.text', 'Company Analytics').and('be.visible')
        cy.get('.mantine-Alert-title').should('have.text', 'Nothing found!').and('be.visible')
        cy.get('.mantine-Alert-message').should('have.text', 'Search for a company to start.').and('be.visible')
    })

    // Testing a company name or code that is not in the 200 company list. 
    it('Require a valid company name or code to search', function () {
        const compAnalytics= new CompanyAnalytics()
        cy.get('.mantine-MultiSelect-label').should('have.text', 'Select up to 3 companies').and ('be.visible')
        this.data.CodeNotInTop200.forEach((code) => {
            cy.search_InvalidCompany(code)
        })
        this.data.NameNotInTop200.forEach((nameCompany) => {
            cy.search_InvalidCompany(nameCompany)
        })
    })

    it('Search successfully A valid company Code', function() {
        const compAnalytics= new CompanyAnalytics()
        this.data.CodeInTop200.forEach(($code) => {
            cy.search_ValidCompany($code)
            cy.Validate_Company_inTable($code)

            this.data.Column_Name.forEach((column_name) => {
                cy.Validate_displayedTable(column_name) 
            })  
            this.data.chart.forEach((chart_name) => {
                cy.Validate_chartsName(chart_name)
            })
            compAnalytics.getBarchart().should('be.visible').and('have.length',3)
            compAnalytics.getLinechart().should('be.visible').and('have.length',5)
            cy.get('.recharts-cartesian-axis').should('be.visible')

            compAnalytics.getRemoveButton().click()
            cy.get('.mantine-1n7zxp').should('not.have.class','mantine-MultiSelect-defaultValue') 
        })
    })

    it('Search successfully A valid company Name', function() {
        const compAnalytics= new CompanyAnalytics()
        
        this.data.NameInTop200.forEach(($name) => {
            cy.search_ValidCompany($name)
            cy.Validate_Company_inTable($name)

            this.data.Column_Name.forEach((column_name) => {
                cy.Validate_displayedTable(column_name) 
            })  
            this.data.chart.forEach((chart_name) => {
                cy.Validate_chartsName(chart_name)
            })
            compAnalytics.getBarchart().should('be.visible').and('have.length',3)
            compAnalytics.getLinechart().should('be.visible').and('have.length',5)
            cy.get('.recharts-cartesian-axis').should('be.visible')

            compAnalytics.getRemoveButton().click()
            cy.get('.mantine-1n7zxp').should('not.have.class','mantine-MultiSelect-defaultValue') 
        })
    })
})


describe('Searching for a list of companies', function () {
    beforeEach(function () {
        cy.login().then(() => {
            cy.fixture('CompAnalytics').then((data) => {
                this.data= data
            })
            cy.visit('company/analytics')
            cy.wait(5000)
        })
    })
    it('ONLY Search up to 3 valid companies Code', function () {
        const compAnalytics= new CompanyAnalytics()
        // select 3 companies 
        let n= 1
        this.data.CodeInTop200.forEach(($code) => {
            if(n<=3){
            cy.search_ValidCompany($code)
            cy.Validate_Company_inTable($code)
            
            this.data.Column_Name.forEach((column_name) => {
                cy.Validate_displayedTable(column_name) 
            })  
            this.data.chart.forEach((chart_name) => {
                cy.Validate_chartsName(chart_name)
            })  
            compAnalytics.getBarchart().should('be.visible').and('have.length',3*n)
            compAnalytics.getLinechart().should('be.visible').and('have.length',5*n)
            cy.get('.recharts-cartesian-axis').should('be.visible')
            n++
            }
            else {
            compAnalytics.getSearch().type('a_code', {force: true})
            compAnalytics.getSearch().should('have.attr', 'readonly')
            compAnalytics.getSelectedComp().should('have.length', 3)
            }
        })
    })
    
    it('ONLY Search up to 3 valid companies Name', function () {
        const compAnalytics= new CompanyAnalytics()
        let a= 1
        this.data.NameInTop200.forEach(($name) => {
            if(a<=3){
            cy.search_ValidCompany($name)
            cy.Validate_Company_inTable($name)
                
            this.data.Column_Name.forEach((column_name) => {
                cy.Validate_displayedTable(column_name) 
            })  
            this.data.chart.forEach((chart_name) => {
                cy.Validate_chartsName(chart_name)
            })  
            compAnalytics.getBarchart().should('be.visible').and('have.length',3*a)
            compAnalytics.getLinechart().should('be.visible').and('have.length',5*a)
            cy.get('.recharts-cartesian-axis').should('be.visible')
            a++
            }
            else {
            compAnalytics.getSearch().type('a_code', {force: true})
            compAnalytics.getSearch().should('have.attr', 'readonly')
            compAnalytics.getSelectedComp().should('have.length', 3)
            }
            })
    })
             
})  
   
    
