
import 'cypress-xpath'

 //Define elements'locators in variables
 const usernameLocator= '//*[@name="username"]'
 const passwordLocator= '//*[@name="password"]'
 const signinButtonLocator= '//button[@type="submit"]'
 const errorMessageLocator= '//div[@class="error"]/p'


 //Define actions for the LoginPage
export const LoginPage = {

    clearUsername(){   
        cy.xpath(usernameLocator).clear()
    },

    clearPassword(){
       cy.xpath(passwordLocator).clear()
    },

    inputUsername(text){
       cy.xpath(usernameLocator).type(text)
    },

    inputPassword(text){
        cy.xpath(passwordLocator).type(text)
    },
    
    submit(){
        cy.xpath(signinButtonLocator).click()
    },

    errorShouldBeDisplayed(message){
        cy.xpath(errorMessageLocator).should('be.visible')
        cy.xpath(errorMessageLocator).should('have.text', message)
        cy.url().should('include', 'error=CredentialsSignin') 
    }

}


