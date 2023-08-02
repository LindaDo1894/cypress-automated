// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })


/*
Cypress.Commands.add('LoginAPI', (token)=> {
    cy.request({
        method: 'GET',
        url:'api/auth/session',
        headers:{
            'Content-Type': 'application/json',
            'Set-Cookie':'__Secure-next-auth.session-token=' + token
        }
       }).then((response) => {
        expect(response.status).to.eq(200)
       })  

})
*/

import { LoginPage } from '../SwiftTMSAutomationTesting/page-objects/login-page.js'
import { RecommendedCompaniesPage } from '../SwiftTMSAutomationTesting/page-objects/recommended-companies-page.js'


const loginURL= 'api/auth/signin?callbackUrl=https%3A%2F%2Fwww.swifttms.com.au%2F'
Cypress.Commands.add('login', (username, password)=> {
    cy.visit(loginURL)
    LoginPage.inputUsername(username)
    LoginPage.inputPassword(password)
    LoginPage.submit()
    cy.url().should('contain','recommended')

})


Cypress.Commands.add("verifyRecommendedCompanyFinancialIndicator", function(index,response) {
    const listOfCompanies= response.body[0].result.data.json.data

    let codeInResponse= listOfCompanies[index].code
    let nameInResponse= listOfCompanies[index].name
    let earningYieldInResponse= parseFloat((listOfCompanies[index].CompanyMetrics.earningsYield *100).toFixed(2))
    let peRatioInResponse=parseFloat((listOfCompanies[index].CompanyMetrics.peRatio).toFixed(2))
    let epsInResponse= parseFloat((listOfCompanies[index].CompanyMetrics.earningsPerShare).toFixed(2))
    let dividendYieldInResponse= parseFloat((listOfCompanies[index].CompanyMetrics.dividendYield).toFixed(2))
    let closingPriceInResponse= parseFloat((listOfCompanies[index].CompanyMetrics.closePrice).toFixed(2))
    let marketPriceInResponse= parseFloat((listOfCompanies[index].CompanyMetrics.marketValuePrice).toFixed(2))
    let discountPriceInResponse= parseFloat((listOfCompanies[index].CompanyMetrics.discountValuePrice).toFixed(2))

    RecommendedCompaniesPage.verifyCompanyCode(index, codeInResponse)
    RecommendedCompaniesPage.verifyCompanyName(index, nameInResponse)
    RecommendedCompaniesPage.verifyEarningsYield(index, earningYieldInResponse)
    RecommendedCompaniesPage.verifyPERatio(index, peRatioInResponse)
    RecommendedCompaniesPage.verifyEPS(index, epsInResponse)
    RecommendedCompaniesPage.verifyDividendYield(index, dividendYieldInResponse)
    RecommendedCompaniesPage.verifyClosingPrice(index, closingPriceInResponse)
    RecommendedCompaniesPage.verifyMarketPrice(index, marketPriceInResponse)
    RecommendedCompaniesPage.verifyDiscountedPrice(index, discountPriceInResponse)

})











//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })