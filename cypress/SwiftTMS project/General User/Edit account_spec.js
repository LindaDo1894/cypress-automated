/// <reference types="cypress" />
import EditAccountPage from "/Users/linhdo/Desktop/Cypress Practice 1/cypress/SwiftTMS project/PageObjects/Edit account page.js"
import LoginPage from "/Users/linhdo/Desktop/Cypress Practice 1/cypress/SwiftTMS project/PageObjects/Loginpage.js"

describe.only('Edit account testing', function () {
    beforeEach(function () {
        cy.login().then(()=> {
            cy.visit('https://www.swifttms.com.au/company/list/recommended')
            const editBoxPage= new EditAccountPage()
            editBox.getIconUser().click()
            editBox.getEditDialog().should('be.visible')        
            })
    })

// Test Name
    it('Name field is required', function () {
            const editBox= new EditAccountPage()
            editBox.getNameField().clear()
            editBox.getSubmit().click()
            cy.wait(4000)
            editBox.getNotiTitle().should('be.visible').and('have.text', 'Error')
            editBox.getNotiContent().should('be.visible').then((el) => {
            expect(el.text()).to.include('String must contain at least 3 character(s)')
            })  
    })     

 
    it('Require a new valid Name', function () { 
            const editBox= new EditAccountPage()
            editBox.getNameField().clear().type('12').should('be.visible')
            editBox.getSubmit().click()
            cy.wait(4000)
            editBox.getNotiTitle().should('be.visible').then((el) => {
                expect(el.text()).to.equal('Error')
            })
            editBox.getNotiContent().should('be.visible').then((el) => {
                expect(el.text()).to.include('String must contain at least 3 character(s)')
            }) 
    })

    it('Edit successfully with a valid name', function () {
            const editBox= new EditAccountPage()
            editBox.getNameField().clear().type('linda').should('be.visible')
            editBox.getSubmit().click()
            cy.wait(4000) 
            editBox.getNotiTitle().should('be.visible').then((el) => {
                expect(el.text()).to.equal('Success')
           })
            editBox.getNotiContent().should('be.visible').then((el) => {
               expect(el.text()).to.include('User updated successfully')
           }) 
            cy.get('.mantine-khtkeg > :nth-child(1) > .mantine-1a08isj span').should('have.text', 'linda') 
    })
        
// Test Username

    it('Username field is required', function () {
        const editBox= new EditAccountPage()
        editBox.getUserNameField().clear()
        editBox.getSubmit().click()
        editBox.getNotiTitle().should('be.visible').then((el) => {
             expect(el.text()).to.equal('Error')
        })
        editBox.getNotiContent().should('be.visible').then((el) => {
            expect(el.text()).to.include('String must contain at least 3 character(s)')
        })   
    })


    it('Require a new valid Username', function () {
        const editBox= new EditAccountPage()
        editBox.getUserNameField().clear().type('12').should('be.visible')
        editBox.getSubmit().click()
        editBox.getNotiTitle().should('be.visible').then((el) => {
             expect(el.text()).to.equal('Error')
        })
        editBox.getNotiContent().should('be.visible').then((el) => {
            expect(el.text()).to.include('String must contain at least 3 character(s)')
        }) 
    })
    


    it('Edit successfully with a valid Username', function () {
        const editBox= new EditAccountPage()
        const newUserName= 'test_generaluser'
        editBox.getUserNameField().clear().type(newUserName).should('be.visible')
        editBox.getSubmit().click()
        cy.wait(5000)
        editBox.getNotiTitle().should('be.visible').then((el) => {
            expect(el.text()).to.equal('Success')
       })
        editBox.getNotiContent().should('be.visible').then((el) => {
           expect(el.text()).to.include('User updated successfully')
       }) 
        editBox.getIconUser().click()
        editBox.getUserNameField().then((text) => {
        const displayedUserName= text.prop('value')
        expect(displayedUserName).to.equal(newUserName)
        })
        editBox.getCrossSign().click()
        editBox.getLogout().click()

        cy.url().should('include', 'api/auth/signin?')
        const logIn= new LoginPage()
        cy.visit('api/auth/signin?callbackUrl=https%3A%2F%2Fwww.swifttms.com.au%2F')
        logIn.getUsername().type(newUserName).should('be.visible')
        logIn.getPassword().type(Cypress.env('password'))
        logIn.getSigninbutton().click()

        cy.url().should('contain','recommended')
        editBox.getIconUser().click()
        editBox.getUserNameField().clear().type(Cypress.env('username')).should('be.visible')
        editBox.getSubmit().click()
        cy.wait(5000)
        editBox.getNotiContent().should('be.visible').then((el) => {
           expect(el.text()).to.include('User updated successfully')
       })
     
    })


// Test Password

    it('Password field is not required', function () {
        const editBox= new EditAccountPage() 
        editBox.getPasswordField().should('be.empty')
        editBox.getSubmit().click()
        cy.wait(5000)
        editBox.getNotiTitle().should('be.visible').then((el) => {
            expect(el.text()).to.equal('Success')
        })
        editBox.getNotiContent().should('be.visible').then((el) => {
        expect(el.text()).to.include('User updated successfully')
        })          
   })

   it('Require a new valid password', function () {
        const editBox= new EditAccountPage() 
        editBox.getPasswordField().type('ab')
        editBox.getSubmit().click() 
        editBox.getNotiTitle().should('be.visible').then((el) => {
            expect(el.text()).to.equal('Error')
        })
        editBox.getNotiContent().should('be.visible').then((el) => {
        expect(el.text()).to.include('String must contain at least 3 character(s)')
        }) 
   })

   it('Edit successfully with a new valid password', function () {
        const editBox= new EditAccountPage()
        const newPassword= 'abc123'
        editBox.getPasswordField().type(newPassword) 
        editBox.getSubmit().click()
        cy.wait(5000)
        editBox.getNotiTitle().should('be.visible').then((el) => {
            expect(el.text()).to.equal('Success')
        })
        editBox.getNotiContent().should('be.visible').then((el) => {
        expect(el.text()).to.include('User updated successfully')
        })
        editBox.getLogout().click()

        cy.url().should('include', 'api/auth/signin?')
        const logIn= new LoginPage()
        cy.visit('api/auth/signin?callbackUrl=https%3A%2F%2Fwww.swifttms.com.au%2F')
        logIn.getUsername().type(Cypress.env('username')).should('be.visible')
        logIn.getPassword().type(newPassword)
        logIn.getSigninbutton().click()

        cy.url().should('contain','recommended')
        editBox.getIconUser().click()
        editBox.getPasswordField().should('be.empty').type(Cypress.env('password'))
        editBox.getSubmit().click()
        cy.wait(5000)
        editBox.getNotiContent().should('be.visible').then((el) => {
        expect(el.text()).to.include('User updated successfully')
        }) 

    })

})


    






        




