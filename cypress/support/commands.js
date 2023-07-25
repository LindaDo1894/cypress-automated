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

/*Cypress.Commands.add('login', ()=> {
    cy.request({
        method:'POST',
        url:'https://www.swifttms.com.au/api/auth/callback/credentials',
        body: {
                username: Cypress.env('username'),
                password: Cypress.env('password'),
                csrfToken:'41715aadab79227bf9d7676dbfd154fc20557e3e201b4dade16c413dd61450c8',
            }   
    }).then((response) => {
        expect(response.headers).to.have.property('__Secure-next-auth.session-')
    })
    
}) */



// Custome commands for `LogIn` page
import LoginPage from "../SwiftTMS project/PageObjects/Loginpage.js"
//For `Top 200` page
import Top200 from "../SwiftTMS project/PageObjects/Top 200 companies.js"
// For `Recommended Companies` page
import RecommendedCompaniesPage from "../SwiftTMS project/PageObjects/Recommended Companies page.js"

Cypress.Commands.add('login', (detail)=> {
    cy.session('detail', () => {
        const logIn = new LoginPage()
        cy.visit('api/auth/signin?callbackUrl=https%3A%2F%2Fwww.swifttms.com.au%2F')
        logIn.getUsername().type(Cypress.env('username')).should('be.visible')
        logIn.getPassword().type(Cypress.env('password'))
        logIn.getSigninbutton().click()  
        cy.url().should('contain','recommended')
            
    })
})


Cypress.Commands.add('Validate_table_content', (content)=> {
    const reCompany= new RecommendedCompaniesPage()
    let result = 'fail'
    reCompany.ColumnName().each((el, index, list) => {
        const textColumn= el.text()
        if(textColumn === content) {
            result= 'pass'
            cy.wrap(el)
        }
    }).then(function() {
        expect(result).to.equal('pass')
    }) 
})

Cypress.Commands.add("viewAnalytics", (compCode)=> {
    const reCompany= new RecommendedCompaniesPage()
    reCompany.CodeColumn().each((el, index, list) => {
        const code= el.text()
        if(code === compCode) {
            reCompany.ActionsColumn().eq(index).click()
            cy.url().should('include', 'company/analytics?companyCode=' + compCode )
            cy.go('back')
            cy.url().should('include', 'recommended')
        }
    })     
})

Cypress.Commands.add('Validate_the_recommendedlist', (code)=> {
    const reCompany= new RecommendedCompaniesPage()
    let result= 'fail'
    reCompany.CodeColumn().each(($el, index, list) => {
        const codeCompany= $el.text()
        if(codeCompany === code) {
            result = 'match'
            cy.wrap($el)
        }
    }).then(function() {
        expect(result).to.equal('match')
    })
}) 



Cypress.Commands.add('Validate_table_content', (content)=> {
    const top200Page= new Top200()
    let result = 'fail'
    top200Page.getColumnName().each((el, index, list) => {
        const textColumn= el.text()
        if(textColumn === content) {
            result= 'pass'
            cy.wrap(el)
        }
    }).then(function() {
        expect(result).to.equal('pass')
    }) 
})

Cypress.Commands.add("validate_ViewAnalytics", (a)=> {
    const top200Page= new Top200()
    top200Page.getCodeColumn().each(($el, index, list) => {
        const code= $el.text()
        if(code === a) {
            cy.wrap($el)
            top200Page.getViewAnalyticLink().eq(index).click()
            cy.url().should('include', 'company/analytics?companyCode=' + a )
            cy.go('back')
            cy.wait(2000)
            cy.url().should('include', 'metrics/top200')
        }
    })     
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