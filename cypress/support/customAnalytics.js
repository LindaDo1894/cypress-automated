
// for `Company Analytics` Page. 

import CompanyAnalytics from '../SwiftTMS project/PageObjects/Company Analytics page.js'
    
Cypress.Commands.add("search_InvalidCompany", (name)=> {
    const compAnalytics= new CompanyAnalytics()
    compAnalytics.getSearch().type(name)
    cy.get('.mantine-Alert-title').should('have.text', 'Nothing found!').and('be.visible')
    cy.get('.mantine-Alert-message').should('have.text', 'Search for a company to start.').and('be.visible')
    compAnalytics.getSearch().clear()

})
 
Cypress.Commands.add("search_ValidCompany", (text_comp) => {
    const compAnalytics= new CompanyAnalytics()
        compAnalytics.getSearch().type(text_comp)
        cy.get('.mantine-MultiSelect-dropdown').should('be.visible')
        cy.get('.mantine-1nbt8iw > .mantine-MultiSelect-item').each(($el, index, list) => {
        const name= $el.text()
        if(name.includes(text_comp)) {
            cy.wrap($el).click()
            compAnalytics.getSearch().click({force: true})
            cy.wait(3000)
            compAnalytics.getSelectedComp().should('be.visible')
        } 
        })
})

Cypress.Commands.add("Validate_Company_inTable",(comp) => {
    let selectedCompany = 'false'
        cy.get('tr > td > .mantine-Text-root').each(($name, index, list) => {
        const displayedName= $name.text()
        if(displayedName.includes(comp))
            {
              selectedCompany= 'match'
            }
        }).then(() => {
               expect(selectedCompany).to.equal('match')
        })

})
        
Cypress.Commands.add("Validate_displayedTable", (col_name) => {
    const compAnalytics= new CompanyAnalytics()
    compAnalytics.getdisplayedTable().should('be.visible')
    compAnalytics.getColumnText().should('have.length', 10)
    compAnalytics.getColumnText().should('have.length', 10)   
    let test= "false"
    compAnalytics.getColumnText().each((el, index, list) => {
        const textCol= el.text()
        if(textCol === col_name) {
            cy.wrap(el)
            test= "true"
        }
    }).then(()=> {
        expect(test).to.equal('true')
        })
})

Cypress.Commands.add("Validate_chartsName", (chartName) => {
    const compAnalytics= new CompanyAnalytics()
    compAnalytics.getIndicators().should('have.length', 8)
    compAnalytics.getIndicators().each(($indi, index, list) => {
        const name= $indi.text()
        if(name === chartName) {
            cy.wrap($indi)
        }
    })

})
          