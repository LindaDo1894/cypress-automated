class RecommendedCompaniesPage 
{
    ColumnName()
    {
        return cy.get('table.mantine-kioxxr  tr > th')
    }

    CodeColumn()
    {
        return cy.get('tbody tr td:nth-child(1)')
    }

    ActionsColumn() // except the 'Actions name'
    {
        return cy.get('tbody tr td:nth-child(10)')
    }

    ViewAnalyticsLink()
    {
        return cy.get('tr td > a')
    }

    SearchArea()
    {
        return cy.get('input.mantine-gszoqu')
    }

}
export default RecommendedCompaniesPage