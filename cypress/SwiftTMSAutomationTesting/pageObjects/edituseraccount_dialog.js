const ICON_LOCATOR= '.tabler-icon-user'
const DIALOG_EDIT_MY_ACCOUNT= '.mantine-Modal-content'
const FIELD_NAME_LOCATOR= '.mantine-1q36a81 .mantine-1ejqehl input'
const FIELD_USERNAME_LOCATOR= '.mantine-11nf037 .mantine-TextInput-wrapper input'
const FIELD_PASSWORD_LOCATOR= '.mantine-PasswordInput-wrapper input'
const BUTTON_SUBMIT_LOCATOR= 'Submit'
const TXT_NOTIFICATION_TITLE= '.mantine-14zcsvh .mantine-Notification-title'
const TXT_NOTIFICATION_CONTENT= '.mantine-14zcsvh .mantine-Notification-description'
const TXT_NAME= '.mantine-khtkeg > :nth-child(1) > .mantine-1a08isj span'

export const Edit_My_Account_Dialog= {
    shouldbedisplayed() {
        cy.get(ICON_LOCATOR).click()
        cy.get(DIALOG_EDIT_MY_ACCOUNT).should('be.visible')
    },

    emptyName() {
        cy.get(FIELD_NAME_LOCATOR).clear()
    },

    emptyUsername() {
        cy.get(FIELD_USERNAME_LOCATOR).clear()
    },

    typeName(value) {

        cy.get(FIELD_NAME_LOCATOR).clear().type(value)
    },

    typeUsername(value) {
        cy.get(FIELD_USERNAME_LOCATOR).clear().type(value)
    },

    typeNewPassword(value) {
        cy.get(FIELD_PASSWORD_LOCATOR).type(value)
    },

    getTextUserNameField(value) {
        cy.get(FIELD_USERNAME_LOCATOR).should('have.value', value)
    },

    clickSubmit() {
        cy.contains(BUTTON_SUBMIT_LOCATOR).click()
    },

    displayedErrorMessage() {
        cy.get(TXT_NOTIFICATION_TITLE).should('be.visible').and('have.text', 'Error')
        cy.get(TXT_NOTIFICATION_CONTENT).should('be.visible').then((el) => {
            expect(el.text()).to.include('String must contain at least 3 character(s)')
        })
    },
    
    displayedSuccessMessage() {
        cy.get(TXT_NOTIFICATION_TITLE).should('be.visible').and('have.text', 'Success')
        cy.get(TXT_NOTIFICATION_CONTENT).should('be.visible').then((el) => {
            expect(el.text()).to.include('User updated successfully')
        })
    },

    displayedNewName(value) {
        cy.get(TXT_NAME).should('have.text', value)
    }


}

    