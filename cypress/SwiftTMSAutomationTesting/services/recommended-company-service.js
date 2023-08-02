

const recommendedCompanyPath= '/api/trpc/company.listRecommended?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22query%22%3A%22%22%2C%22page%22%3A0%7D%7D%7D'

export const RecommendedCompaniesServiceAPI= (token)=>{
    return cy.request({
            method: "GET",
            url: recommendedCompanyPath,
            headers:{
            'Content-Type': 'application/json',
            'Set-Cookie': '__Secure-next-auth.session-token=' + token
            }
            }).then((response) => {
                 expect(response.status).to.eq(200)
                })
}
   
      
   



/*
            cy.getCookie('__Secure-next-auth.session-token').then((Object) => {
                cy.log(Object.value) //get cookie value , because cy.getCookie() yields the whole object
            })
*/