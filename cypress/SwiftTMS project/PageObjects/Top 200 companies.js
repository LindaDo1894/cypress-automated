class Top200
{
getPageTitle()
{
    return cy.get('.mantine-q6j3x1 > .mantine-Text-root')
}
getColumnName()
{
    return cy.get('thead > tr > th')
}
getRows()
{
    return cy.get('tbody > tr')
}
getViewAnalyticLink()
{
    return cy.get('tbody > tr > td a')
}
getCodeColumn()
{
    return cy.get('tbody > tr > td:nth-child(2)')
}
}
export default Top200