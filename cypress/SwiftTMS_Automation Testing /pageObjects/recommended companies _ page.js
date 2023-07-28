const SEARCH_AREA_LOCATOR= 'input.mantine-gszoqu'
const LINK_VIEW_ANALYTICS= 'tr td > a'
const DISPLAYED_RECOMMENDED_COMP= 'table > tbody > tr'
const TXT_PAGE_TITLE= '.mantine-q6j3x1 > .mantine-Title-root'
const RECOMMENDED_CODECOMP_LOCATOR= 'tbody tr td:nth-child(1)'
const RECOMMENDED_NAMECOMP_LOCATOR= 'tbody tr td:nth-child(2)'

const VALUE_EARNINGS_YIELD= 'tbody tr td:nth-child(3)'
const VALUE_PE_RATIO= 'tbody tr td:nth-child(4)'
const VALUE_EPS= 'tbody tr td:nth-child(5)'
const VALUE_DIVIDEND_YIELD= 'tbody tr td:nth-child(6)'
const VALUE_CLOSING_PRICE= 'tbody tr td:nth-child(7)'
const VALUE_MARKET_PRICE= 'tbody tr td:nth-child(8)'
const VALUE_DISCOUNTED_PRICE= 'tbody tr td:nth-child(9)'


export const Recommended_Companies_Page= {
    
    ValidateTitle() {
        cy.get(TXT_PAGE_TITLE).should('be.visible').and('have.text', 'Recommended Companies' )
    },

    Validate_Search_Invalid_Comp(value) {
       cy.get(SEARCH_AREA_LOCATOR).clear().type(value)
       cy.get(DISPLAYED_RECOMMENDED_COMP).should('have.length', 0)
    },
    
    Validate_Search_Valid_Code_Comp(value) {
        cy.get(SEARCH_AREA_LOCATOR).clear().type(value)
        cy.wait(3000)
        cy.get(DISPLAYED_RECOMMENDED_COMP).should('be.visible').and('have.length', 1)
        cy.get(RECOMMENDED_CODECOMP_LOCATOR).should('have.text', value)
    },

    Validate_Search_Valid_Name_Comp(value) {
        cy.get(SEARCH_AREA_LOCATOR).clear().type(value)
        cy.wait(3000)
        cy.get(DISPLAYED_RECOMMENDED_COMP).should('be.visible').and('have.length', 1)
        cy.get(RECOMMENDED_NAMECOMP_LOCATOR).should('have.text', value)
    },
    

    ValidateViewAnalyticsLink() {
        cy.get(LINK_VIEW_ANALYTICS).should('have.attr', 'href')
        cy.get(LINK_VIEW_ANALYTICS).each((el, index, list) => {
            const url= el.prop('href')
            expect(url).to.include('/company/analytics?companyCode=')
        })
    },

    VerifyCodeComp(index, code) {
        cy.get(RECOMMENDED_CODECOMP_LOCATOR).eq(index).should('have.text', code)
    },

    VerifyNameComp(index, name) {
        cy.get(RECOMMENDED_NAMECOMP_LOCATOR).eq(index).should('have.text', name)
    }, 

    VerifyEarningsYield(index, value) {
        cy.get(VALUE_EARNINGS_YIELD).eq(index).then($el => {
            const earningsYield= parseFloat($el.text())
            expect(earningsYield).to.eq(value)
        })
        
    }, 

    VerifyPE_Ratio(index, value) {
        cy.get(VALUE_PE_RATIO).eq(index).then($el => {
            const PE_Ratio= parseFloat($el.text())
            expect(PE_Ratio).to.eq(value)
        })
    }, 

    VerifyEPS(index, value) {
        cy.get(VALUE_EPS).eq(index).then($el => {
            const valueEPS= parseFloat($el.text().slice(1))
            cy.log(valueEPS)
            expect(valueEPS).to.eq(value)
        })
    }, 

    VerifyDividendYield(index, value) {
        cy.get(VALUE_DIVIDEND_YIELD).eq(index).then($el => {
            const dividendYield= parseFloat($el.text())
            expect(dividendYield).to.eq(value)
        })
    }, 

    VerifyClosingPrice(index, value) {
        cy.get(VALUE_CLOSING_PRICE).eq(index).then($el => {
            const closingPrice= parseFloat($el.text().slice(1))
            expect(closingPrice).to.eq(value)
        })
    }, 

    VerifyMarketPrice(index, value) {
        cy.get(VALUE_MARKET_PRICE).eq(index).then($el => {
            const marketPrice= parseFloat($el.text().slice(1))
            expect(marketPrice).to.eq(value)
        })
    }, 

    VerifyDiscountedPrice(index, value) {
        cy.get(VALUE_DISCOUNTED_PRICE).eq(index).then($el => {
            const discountedPrice= parseFloat($el.text().slice(1))
            expect(discountedPrice).to.eq(value)
        })
    }, 

}