const GET_PURCHASE_PATH = 'https://www.swifttms.com.au/api/trpc/order.list?batch=1&input=%7B%220%22%3A%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D%7D'
const AUTHENT_NEW_BE_PORTAL_PATH = '/PortalApi/Login/Authenticate'

export const PurchaseService = {

	getPurchase(token) {
		let url = GET_PURCHASE_PATH
		return cy.request({
			name: 'Get Purchases',
			method: 'GET',
			url: url,
            headers:{
                'Content-Type': 'application/json',
                'Set-Cookie': '__Secure-next-auth.session-token=' + token
            }
		}).then((response) => {
            expect(response.status).to.eq(200);
			return response.body
		})
	}
}