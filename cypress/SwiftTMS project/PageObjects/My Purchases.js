class MyPurchases 
{
    getTitle()
    {
        return cy.get('.mantine-1tea8o2 .mantine-Title-root')
    }
    getAddPurchaseButton()
    {
        return cy.get('.mantine-q6j3x1 .mantine-UnstyledButton-root ')
    }
    
    getColumnInTable()
    {
        return cy.get('.mantine-Table-root tr > th')
    }
    getNameOfField()
    {
        return cy.get('.mantine-1avyp1d  div > .mantine-InputWrapper-label')
    }
    CompanyCodeField()
    {
        return cy.get('.mantine-TextInput-input')
    }
    QuantityField()
    {
        return cy.get('input.mantine-NumberInput-input').eq(0)
    }
    PriceField()
    {
        return cy.get('input.mantine-NumberInput-input').eq(1)
    }
    TotalField()
    {
        return cy.get('input.mantine-NumberInput-input').eq(2)
    }
    CloseButton()
    {
        return  cy.get('.mantine-CloseButton-root')
    }
    NotificationTitle()
    {
        return cy.get('.mantine-Notification-title')
    }
    NotificationBody()
    {
        return cy.get('.mantine-Notification-description')
    }
    EditButton()
    {
        return cy.get('td > .mantine-Button-root')
    }

    VerifyCode(code){
        cy.xpath('//tbody/tr[1]/td[1]').should('have.text',code)
    }
}
export default MyPurchases