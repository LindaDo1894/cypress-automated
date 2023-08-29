
import 'cypress-xpath'
const rankColumnLocator = '//tbody/tr/td[1]'
const viewAnalyticsLinkLocator = '//tbody/tr/td[10]/a'
const codeLocator = '//tbody/tr/td[2]'

export const Top200CompaniesPage = {
   numberOfTopCompaniesShouldBeDisplayed (number) {
    cy.xpath(rankColumnLocator).should('be.visible').and('have.length', number)
   },

   numberOfViewAnalyticsLinkShouldBeIncluded (number) {
    cy.xpath(viewAnalyticsLinkLocator).should('have.attr', 'href')
    cy.xpath(viewAnalyticsLinkLocator).should('have.length', number)
   },

   viewAnalyticsLinksShouldBeActive (index) {
      cy.xpath(codeLocator).then((code) => {
         const companyCode = code.eq(index).text()
         cy.xpath(viewAnalyticsLinkLocator).then(($el) => {
            const linkText = $el.eq(index).prop('href')
            expect(linkText).to.include('/company/analytics?companyCode='+ companyCode)
         }) 
         cy.xpath(viewAnalyticsLinkLocator).eq(index).click()
         cy.url().should('include','/company/analytics?companyCode='+ companyCode)
         cy.go('back')
      })

      
   }  
}

