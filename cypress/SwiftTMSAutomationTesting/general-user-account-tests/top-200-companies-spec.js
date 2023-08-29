/// <reference types="cypress" />

import { Top200CompaniesPage } from '../page-objects/top-200-companies-page'

const registeredUserName= Cypress.env('username')
const registeredPW= Cypress.env('password')

describe('testing top 200 companies', function () {

    beforeEach(function () {
        cy.login(registeredUserName, registeredPW).then(() => {
            cy.visit('metrics/top200')
        })
    }) 
    
    it('Must display the top 200 companies', function () {
        Top200CompaniesPage.numberOfTopCompaniesShouldBeDisplayed(200)
    })
    
    it('Require a view analytics link in the Actions column', function () {
        Top200CompaniesPage.numberOfViewAnalyticsLinkShouldBeIncluded(200)
        Top200CompaniesPage.viewAnalyticsLinksShouldBeActive(0)
        Top200CompaniesPage.viewAnalyticsLinksShouldBeActive(1)
        Top200CompaniesPage.viewAnalyticsLinksShouldBeActive(2)
    })

    

 })