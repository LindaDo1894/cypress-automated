class EditAccountPage 
{
    getIconUser()
    {
        return cy.get('.tabler-icon-user')
    }

    getEditDialog()
    {
        return cy.get('.mantine-Modal-content')
    }

    getNameField()
    {
        return cy.get('.mantine-1q36a81 .mantine-1ejqehl input')
    }

    getUserNameField()
    {
        return cy.get('.mantine-11nf037 .mantine-TextInput-wrapper input')
    }

    getPasswordField()
    {
        return cy.get('.mantine-PasswordInput-wrapper input')
    }

    getSubmit()
    {
        return cy.contains('Submit')
    }
    getNotiTitle()
    {
        return cy.get('.mantine-14zcsvh .mantine-Notification-title')
    }
    getNotiContent() 
    {
        return cy.get('.mantine-14zcsvh .mantine-Notification-description')
    }
    getCrossSign()
    {
        return cy.get('.mantine-Modal-header > .mantine-UnstyledButton-root')
    }
    getLogout()
    {
        return cy.get('.mantine-khtkeg > :nth-child(2) > .mantine-1a08isj > .mantine-Text-root')
    }
}
export default EditAccountPage
