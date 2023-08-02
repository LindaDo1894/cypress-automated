/// <reference types="cypress" />
import { RecommendedCompaniesPage } from '../page-objects/recommended-companies-page.js'
import { RecommendedCompaniesServiceAPI } from '../services/recommended-company-service.js'


const registeredUserName= Cypress.env('username')
const registeredPW= Cypress.env('password')



describe('Testing Recommended Companies Page', function () {
    beforeEach(function () {
            cy.login(registeredUserName,registeredPW).then(() => {
            cy.visit('company/list/recommended')
            cy.fixture('recommended-companies').then(function(data) {
                this.data= data 
            })
        })  
    })

    it('include a page title and a link for each ViewAnalytics', function () {
        RecommendedCompaniesPage.verifyTitle('Recommended Companies')
        RecommendedCompaniesPage.verifyViewAnalyticsLink()
    })

    it('require a valid company NAME or CODE to search', function () {
        RecommendedCompaniesPage.verifySearchInvalidCompany(this.data.invalidName[0])
        RecommendedCompaniesPage.verifySearchInvalidCompany(this.data.invalidName[1])
        RecommendedCompaniesPage.verifySearchInvalidCompany(this.data.invalidName[2])

        RecommendedCompaniesPage.verifySearchInvalidCompany(this.data.invalidCode[0])
        RecommendedCompaniesPage.verifySearchInvalidCompany(this.data.invalidCode[1])
        RecommendedCompaniesPage.verifySearchInvalidCompany(this.data.invalidCode[2])

    })

    it('search successfully a recommended company', function() {

        RecommendedCompaniesPage.verifySearchValidCodeCompany(this.data.validCode[0])
        RecommendedCompaniesPage.verifySearchValidCodeCompany(this.data.validCode[1])
        RecommendedCompaniesPage.verifySearchValidCodeCompany(this.data.validCode[2])

        RecommendedCompaniesPage.verifySearchValidNameCompany(this.data.validName[0])
        RecommendedCompaniesPage.verifySearchValidNameCompany(this.data.validName[1])
        RecommendedCompaniesPage.verifySearchValidNameCompany(this.data.validName[2])
    })
    
    it('verify the displayed companies on the page', function () {
    
        var token = cy.getCookie('__Secure-next-auth.session-token')

        RecommendedCompaniesServiceAPI(token).then((response) => {
            const listIndexComp= [0,1,2,3,4]
            listIndexComp.forEach(($index) => {
            cy.verifyRecommendedCompanyFinancialIndicator($index, response)

            })
            
        })
    })
})










           

        



            
        
            



    




