import 'cypress-xpath'

const iconLocator= '//*[contains (@class, "tabler-icon-user")]'
const editMyAccountDialog= '//div/*[contains (@class,"mantine-Modal-content mantine-3cevnw")]'
const nameFieldLocator= '//form/div [1]//input [@type = "text"]'
const usernameFieldLocator= '//form/div [2]//input [@type = "text"]'
const passwordFieldLocator= '//form/div [3]//input [@type = "password"]'
const submitButtonLocator= '//form//div/*[contains (@class, "mantine-Button-label")]'
const titleOfNotification= '//div [contains (@class, "mantine-Notification-title")]'
const contentOfNotification= '//div [contains (@class, "mantine-Notification-description")]'
const nameLocator= '//div [@class = "mantine-khtkeg"]/a [1]//*[@class= "mantine-Text-root mantine-1k0grif"]'

export const EditMyAccountPage= {
    shouldbeDisplayed() {
        cy.xpath(iconLocator).click()
        cy.xpath(editMyAccountDialog).should('be.visible')
    },

    clearName() {
        cy.xpath(nameFieldLocator).clear()
    },

    clearUsername() {
        cy.xpath(usernameFieldLocator).clear()
    },

    inputName(value) {

        cy.xpath(nameFieldLocator).clear().type(value)
    },

    inputUsername(value) {
        cy.xpath(usernameFieldLocator).clear().type(value)
    },

    inputNewPassword(value) {
        cy.xpath(passwordFieldLocator).type(value)
    },

    verifyTextInUserNameField(value) {
        cy.xpath(usernameFieldLocator).should('have.value', value)
    },

    submit() {
        cy.xpath(submitButtonLocator).click()
    },

    verifyErrorMessage(text) {
        cy.xpath(titleOfNotification).should('be.visible').and('have.text', 'Error')
        cy.xpath(contentOfNotification).should('be.visible').then((el) => {
            expect(el.text()).to.include(text)
        })
    },
    
    verifySuccessMessage(text) {
        cy.xpath(titleOfNotification).should('be.visible').and('have.text', 'Success')
        cy.xpath(contentOfNotification).should('be.visible').then((el) => {
            expect(el.text()).to.include(text)
        })
    },

    verifyNewName(value) {
        cy.xpath(nameLocator).should('have.text', value)
    }

}

    