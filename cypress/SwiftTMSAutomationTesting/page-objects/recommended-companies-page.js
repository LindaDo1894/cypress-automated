import 'cypress-xpath'

const searchAreaLocator= '//div/div [1]// input'
const viewAnalyticsLinkLocator= '//td/a [contains (@href,"/company/analytics?")]'
const displayedRecommendedCompanyLocator= '//table/tbody/tr'
const textPageTitlelocator= '//main//div/*[contains (@class, "mantine-Title-root")]'

const recommendedCodeCompanyLocator= '//tbody/tr/td[1]'
const recommededNameCompanyLocator= '//tbody/tr/td[2]'
const earningsYieldValueLocator= '//tbody/tr/td[3]'
const peRatioValueLocator= '//tbody/tr/td[4]'
const epsValueLocator= '//tbody/tr/td[5]'
const dividendYieldValueLocator= '//tbody/tr/td[6]'
const closingPriceValueLocator= '//tbody/tr/td[7]'
const marketPriceValueLocator= '//tbody/tr/td[8]'
const discountedPriceValueLocator= '//tbody/tr/td[9]'


export const RecommendedCompaniesPage= {
    
    verifyTitle(text) {
        cy.xpath(textPageTitlelocator).should('be.visible').and('have.text', text )
    },

    verifySearchInvalidCompany(value) {
       cy.xpath(searchAreaLocator).clear().type(value)
       cy.xpath(displayedRecommendedCompanyLocator).should('have.length', 0)
    },
    
    verifySearchValidCodeCompany(value) {
        cy.xpath(searchAreaLocator).clear().type(value)
        
        cy.xpath(displayedRecommendedCompanyLocator).should('be.visible').and('have.length', 1)
        cy.xpath(recommendedCodeCompanyLocator).should('have.text', value)
    },

    verifySearchValidNameCompany(value) {
        cy.xpath(searchAreaLocator).clear().type(value)
        cy.xpath(displayedRecommendedCompanyLocator).should('be.visible').and('have.length', 1)
        cy.xpath(recommededNameCompanyLocator).should('have.text', value)
    },
    

    verifyViewAnalyticsLink() {
        cy.xpath(viewAnalyticsLinkLocator).should('have.attr', 'href')
        cy.xpath(viewAnalyticsLinkLocator).each((el, index, list) => {
            const url= el.prop('href')
            expect(url).to.include('/company/analytics?companyCode=')
        })
    },

    verifyCompanyCode(index, code) {
        cy.xpath(recommendedCodeCompanyLocator).eq(index).should('have.text', code)
    },

    verifyCompanyName(index, name) {
        cy.xpath(recommededNameCompanyLocator).eq(index).should('have.text', name)
    }, 

    verifyEarningsYield(index, value) {
        cy.xpath(earningsYieldValueLocator).eq(index).then($el => {
            const earningsYield= parseFloat($el.text())
            expect(earningsYield).to.eq(value)
        })
        
    }, 

    verifyPERatio(index, value) {
        cy.xpath(peRatioValueLocator).eq(index).then($el => {
            const peRatio= parseFloat($el.text())
            expect(peRatio).to.eq(value)
        })
    }, 

    verifyEPS(index, value) {
        cy.xpath(epsValueLocator).eq(index).then($el => {
            const epsValue= parseFloat($el.text().slice(1))
            cy.log(epsValue)
            expect(epsValue).to.eq(value)
        })
    }, 

    verifyDividendYield(index, value) {
        cy.xpath(dividendYieldValueLocator).eq(index).then($el => {
            const dividendYield= parseFloat($el.text())
            expect(dividendYield).to.eq(value)
        })
    }, 

    verifyClosingPrice(index, value) {
        cy.xpath(closingPriceValueLocator).eq(index).then($el => {
            const closingPrice= parseFloat($el.text().slice(1))
            expect(closingPrice).to.eq(value)
        })
    }, 

    verifyMarketPrice(index, value) {
        cy.xpath(marketPriceValueLocator).eq(index).then($el => {
            const marketPrice= parseFloat($el.text().slice(1))
            expect(marketPrice).to.eq(value)
        })
    }, 

    verifyDiscountedPrice(index, value) {
        cy.xpath(discountedPriceValueLocator).eq(index).then($el => {
            const discountedPrice= parseFloat($el.text().slice(1))
            expect(discountedPrice).to.eq(value)
        })
    }, 

}