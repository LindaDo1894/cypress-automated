import 'cypress-xpath'

const titleLocator = '//*[text()="List of Purchases"]'
const addPurchaseButtonLocator = '//div/button'
const addPurchaseDialogLocator = '//section[@role="dialog"]'
const companyCodeFieldLocator = '//label[text()="Company Code"]/..//input'
const quantityFieldLocator = '//label[text()="Quantity"]/..//input'
const priceFieldLocator = '//label[text()="Price"]/..//input'
const totalFieldLocator = '//label[text()="Total"]/..//input'
const submitButtonLocator = '//*[text()="Submit"]'
const notificationLocator = "//div[contains(@class,'mantine-Notification-title')]"
const editButtonLocator = "//*[text()='Edit']"
const deleteButtonLocator = '//*[text()="Delete"]'
const deleteMessageLocator = '//section//*[@class="mantine-Text-root mantine-1d564l0"]'
const cancelButtonLocator = '//*[text()="Cancel"]'
const finalDeleteButtonLocator = '//div[@class="mantine-2kfpzg"]/button[2]'

export const MyPurchasesPage = {
    verifyPageTile (text) {
        cy.xpath(titleLocator).should('be.visible').and('have.text', text)
    },

    verifyAddPurchaseButton () {
        cy.xpath(addPurchaseButtonLocator).should('be.visible').click()
        cy.xpath(addPurchaseDialogLocator).should('be.visible')
    },

    verifyCompanyCodeValue (code) {
        cy.xpath(companyCodeFieldLocator).clear().type(code)
    },

    verifyQuantityValue (number) {
        cy.xpath(quantityFieldLocator).clear().type(number)

    },         

    verifyPriceValue (price) {
        cy.xpath(priceFieldLocator).clear().type(price)
    }, 

    verifyTotalValue (value1, value2) {
        cy.xpath(totalFieldLocator).should('have.value', value1*value2 + '.00')
    },

    verifyInvalidTotalValue (number) {
        cy.xpath(totalFieldLocator).clear().type(number)
    },

    verifySubmitButton () {
        cy.xpath(submitButtonLocator).click()
    }, 

    verifyNotification (text) {
        cy.xpath(notificationLocator).should('be.visible').and('have.text', text)
    }, 

    verifyEditButton (index) {
        cy.xpath(editButtonLocator).eq(index).click()
    }, 

    verifyDeleteButton () {
        cy.xpath(deleteButtonLocator).click()
    },
    verifyDeleteMessage (text) {
        cy.xpath(deleteMessageLocator).should('be.visible').and('have.text', text)
    }, 

    verifyDeleteButtonInTheMessage () {
        cy.xpath(finalDeleteButtonLocator).click()
    }
    


}