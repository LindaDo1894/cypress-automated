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

import { Login_Page } from '../SwiftTMS_Automation Testing /pageObjects/login_page.js'
import { Recommended_Companies_Page } from '../SwiftTMS_Automation Testing /pageObjects/recommended companies _ page.js'
                                      //     /Users/linhdo/Desktop/cypress-automated/cypress/SwiftTMS_Automation Testing /General User Account Tests/RecommendedCompany_spec.js
                                    //     /Users/linhdo/Desktop/cypress-automated/cypress/support/commands.js


const LOGIN_URL= 'api/auth/signin?callbackUrl=https%3A%2F%2Fwww.swifttms.com.au%2F'
Cypress.Commands.add('Login', (username, password)=> {
    cy.visit(LOGIN_URL)
    Login_Page.typeUsername(username)
    Login_Page.typePassword(password)
    Login_Page.submitSignIn()
    cy.url().should('contain','recommended')

})


Cypress.Commands.add("Validate_Recommended_Company_Financial_Indicator", function(index, APIresponse) {
    const listOfCompanies= APIresponse.body[0].result.data.json.data

    let Code_Response= listOfCompanies[index].code
    let Name_Response= listOfCompanies[index].name
    let EarningYield_Response= parseFloat((listOfCompanies[index].CompanyMetrics.earningsYield *100).toFixed(2))
    let PE_Response=parseFloat((listOfCompanies[index].CompanyMetrics.peRatio).toFixed(2))
    let EPS_Response= parseFloat((listOfCompanies[index].CompanyMetrics.earningsPerShare).toFixed(2))
    let Dividend_Yield_Response= parseFloat((listOfCompanies[index].CompanyMetrics.dividendYield).toFixed(2))
    let Closing_Price_Response= parseFloat((listOfCompanies[index].CompanyMetrics.closePrice).toFixed(2))
    let Market_Price_Response= parseFloat((listOfCompanies[index].CompanyMetrics.marketValuePrice).toFixed(2))
    let Discount_Price_Response= parseFloat((listOfCompanies[index].CompanyMetrics.discountValuePrice).toFixed(2))

    Recommended_Companies_Page.VerifyCodeComp(index, Code_Response)
    Recommended_Companies_Page.VerifyNameComp(index, Name_Response)
    Recommended_Companies_Page.VerifyEarningsYield(index, EarningYield_Response)
    Recommended_Companies_Page.VerifyPE_Ratio(index, PE_Response )
    Recommended_Companies_Page.VerifyEPS(index, EPS_Response)
    Recommended_Companies_Page.VerifyDividendYield(index, Dividend_Yield_Response)
    Recommended_Companies_Page.VerifyClosingPrice(index, Closing_Price_Response)
    Recommended_Companies_Page.VerifyMarketPrice(index, Market_Price_Response)
    Recommended_Companies_Page.VerifyDiscountedPrice(index, Discount_Price_Response)

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