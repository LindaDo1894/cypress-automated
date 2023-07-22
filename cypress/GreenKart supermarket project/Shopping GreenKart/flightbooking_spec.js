/// <reference types="cypress" />
import Flightbooking from'../PageObjects/FlightBookingPage.js'


describe(' Test flight booking website', function () {
    beforeEach(function () {
        cy.visit('https://rahulshettyacademy.com/dropdownsPractise/')
    })
/*
    it('Search function and Travel options', function () {
        const flightPage= new Flightbooking()

        flightPage.getSearchCountry().type('au')
        cy.get('.ui-menu-item').invoke('show').each((el, index, list) => {
            const countryName= el.text()
            if(countryName.includes('Australia')) {
                cy.wrap(el).click({force:true})
                flightPage.getSearchCountry().then((el) => {
                    const selectedCountry= el.val()
                    expect(selectedCountry).to.equal('Australia')
                })
                }
        })

        flightPage.getTravelRadioOptions().should('be.visible').and('have.length', '3')
        flightPage.getTravelRadioOptions().check('TripPlanner').should('be.checked')
        cy.get('.MultiCityContent').then((el) => {
            const message= el.text()
            expect(message).to.include('Multicity booking does not mean connecting flight')
        })
        cy.get('#MultiCityModelAlert').click()
        flightPage.getTravelRadioOptions().check('RoundTrip').should('be.checked')

    }) 
*/
    it('Test departure and destination', function () {
        const flightPage= new Flightbooking()
        flightPage.getFromCity().click()
        flightPage.getEachDeparturecity().each((el) => {
            const placeName= el.text()
            if(placeName ===' Bangkok (BKK)'){
                cy.wrap(el).click()
                flightPage.getFromCity().invoke('val').should('equal', 'Bangkok (BKK)')
                
            }

        })

        flightPage.getToCity().click()
        flightPage.getEachDestinationcity().each((destinaton) => {
            const destinationCity=destinaton.text()
            if(destinationCity.includes(' Kochi (COK)')) {
                cy.wrap(destinaton).invoke('show').click({force:true})
                flightPage.getToCity().invoke('val').should('equal','Kochi (COK)')
            }
        })
    })
/*
    it('Test depart date and return date', function () {
        const flightPage= new Flightbooking()
        flightPage.getDepartDate().click()
        cy.get('#ui-datepicker-div').should('be.visible')
        cy.get('[data-handler="selectDay"][data-month="7"]').each((date, index, list) => {
            const departDate= date.text()
            let result = 'failed'
            if(departDate == 25) {
               
                cy.wrap(date).click({force:true})
                
            }
            
            
            
        })
    })
*/   
})




    

