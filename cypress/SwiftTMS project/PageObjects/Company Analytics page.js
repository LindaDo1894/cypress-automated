class CompanyAnalytics 
{
    getTitle()
    {
        return cy.get('.mantine-q6j3x1 > .mantine-Text-root')
    }

    getSearch()
    {
        return cy.get('.mantine-Input-input [type="search"]')
    }
    getSelectedComp()
    {
        return cy.get('.mantine-MultiSelect-defaultValueLabel')
    }
    getRemoveButton()
    {
        return cy.get('.mantine-CloseButton-root')
    }
    getdisplayedTable()
    {
        return cy.get('.mantine-Table-root')
    }
    getColumnText()
    {
        return cy.get('.mantine-Table-root tr > th ')
    }
    getEachRow()
    {
        return cy.get('tbody > tr')
    }
    getIndicators()
    {
        return cy.get('div.mantine-caxjnw .mantine-Text-root')
    }
    getBarchart()
    {
        return cy.get('.recharts-bar')
    }
    getLinechart()
    {
        return cy.get('.recharts-line')
    }
}
export default CompanyAnalytics