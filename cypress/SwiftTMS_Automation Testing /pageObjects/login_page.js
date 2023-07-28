
 //Define elements'locators in variables
 const FIELD_USERNAME_LOCATOR= '[name="username"]'
 const FIELD_PASSWORD_LOCATOR= '[name="password"]'
 const BUTTON_SIGNIN_LOCATOR= 'button[type="submit"]'
 const TXT_ERROR_MESSAGE= '.error > p'


 //Define actions for the LoginPage
export const Login_Page = {

    emptyUsername(){   
        cy.get(FIELD_USERNAME_LOCATOR).clear()
    },

    emptyPassword(){
       cy.get(FIELD_PASSWORD_LOCATOR).clear()
    },

    typeUsername(text){
       cy.get(FIELD_USERNAME_LOCATOR).type(text)
    },

    typePassword(text){
        cy.get(FIELD_PASSWORD_LOCATOR).type(text)
    },
    
    submitSignIn(){
        cy.get(BUTTON_SIGNIN_LOCATOR).click()
    },

    shouldBeDisplayedError(){
        cy.get(TXT_ERROR_MESSAGE).should('be.visible')
        cy.get(TXT_ERROR_MESSAGE).should('have.text', 'Sign in failed. Check the details you provided are correct.')
        cy.url().should('include', 'error=CredentialsSignin') 
    }

}


