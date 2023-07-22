class Flightbooking
{
    getSearchCountry()
    {
        return cy.get('#autosuggest')
    }
    getTravelRadioOptions()
    {
        return cy.get('#travelOptions  input[type="radio"]')
    }
    getFromCity()
    {
        return cy.get('#ctl00_mainContent_ddl_originStation1_CTXT')
    }
    getEachDeparturecity()
    {
        return cy.get('.dropdownDiv a[href="#"]')
    }
    getToCity()
    {
        return cy.get('#ctl00_mainContent_ddl_destinationStation1_CTXT')
    }
    getEachDestinationcity()
    {
        return cy.get('.mapbg li a[href="#"]:visible')
    }
    getDepartDate()
    {
        return cy.get('#ctl00_mainContent_view_date1')
    }
    getReturnDate()
    {
        return cy.get('#ctl00_mainContent_view_date2')
    }
}
export default Flightbooking