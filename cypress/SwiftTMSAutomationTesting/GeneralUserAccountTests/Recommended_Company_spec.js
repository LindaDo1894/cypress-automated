/// <reference types="cypress" />
import { Recommended_Companies_Page } from '../pageObjects/recommendedcompanies _ page.js'
import { Recommended_Companies_Service_API } from '../services/recommendedcompany_service.js'


const registeredUserName= Cypress.env('username')
const registeredPW= Cypress.env('password')



describe('Testing Recommended Companies Page', function () {
    beforeEach(function () {
            cy.Login(registeredUserName,registeredPW).then(() => {
            cy.visit('company/list/recommended')
            cy.fixture('RecommendedCompanies').then(function(data) {
                this.data= data 
            })
        })  
    })

    it('include a page title and a link for each ViewAnalytics', function () {
        Recommended_Companies_Page.ValidateTitle()
        Recommended_Companies_Page.ValidateViewAnalyticsLink()
    })

    it('require a valid company NAME or CODE to search', function () {
        Recommended_Companies_Page.Validate_Search_Invalid_Comp(this.data.invalidName[0])
        Recommended_Companies_Page.Validate_Search_Invalid_Comp(this.data.invalidName[1])
        Recommended_Companies_Page.Validate_Search_Invalid_Comp(this.data.invalidName[2])

        Recommended_Companies_Page.Validate_Search_Invalid_Comp(this.data.invalidCode[0])
        Recommended_Companies_Page.Validate_Search_Invalid_Comp(this.data.invalidCode[1])
        Recommended_Companies_Page.Validate_Search_Invalid_Comp(this.data.invalidCode[2])

    })

    it('search successfully a recommended company', function() {

        Recommended_Companies_Page.Validate_Search_Valid_Code_Comp(this.data.validCode[0])
        Recommended_Companies_Page.Validate_Search_Valid_Code_Comp(this.data.validCode[1])
        Recommended_Companies_Page.Validate_Search_Valid_Code_Comp(this.data.validCode[2])

        Recommended_Companies_Page.Validate_Search_Valid_Name_Comp(this.data.validName[0])
        Recommended_Companies_Page.Validate_Search_Valid_Name_Comp(this.data.validName[1])
        Recommended_Companies_Page.Validate_Search_Valid_Name_Comp(this.data.validName[2])
    })
    
    it('verify the displayed companies on the page', function () {
    
        var token = cy.getCookie('__Secure-next-auth.session-token')

        Recommended_Companies_Service_API(token).then((response) => {
            cy.wait(5000)
            const listIndexComp= [0,1,2,3,4]
            listIndexComp.forEach(($index) => {
            cy.Validate_Recommended_Company_Financial_Indicator($index, response)

            })
            
        })
    })
})










           

        



            
        
            



    




