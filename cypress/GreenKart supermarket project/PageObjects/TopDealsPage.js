class Topdeals 
{
    getSearch()
    {
        return cy.get('#search-field')
    }
    getTableColumn()
    {
        return cy.get('table.table-bordered [role="columnheader"]')
    }
    getPageSize()
    {
        return   cy.get('select#page-menu')
    }
    getPagination()
    {
        return cy.get('.pagination')
    }




}
export default Topdeals