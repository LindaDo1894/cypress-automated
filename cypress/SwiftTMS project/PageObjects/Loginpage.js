class LoginPage
{
    getUsername()
    {
        return cy.get('[name="username"]')
    }
    getPassword()
    {
        return cy.get('[name="password"]')
    }
    getSigninbutton()
    {
        return cy.get('button')
    }
    getErrormessage()
    {
        return cy.get('.error > p')
    }

}
export default LoginPage