class Shoppingpage
{
 getSearch() 
 {
   return cy.get('.search-keyword')
 }
 getALLProduct()
 {
   return cy.get('.products > .product')
 }
 getTopDealsLink()
 {
   return cy.get('.cart > [href="#/offers"]')
 }
 getFlightBookingLink()
 {
   return cy.get('[href*="dropdownsPractise"]')
 }
 getCartLink()
 {
   return cy.get('.cart-icon[href="#"]')
}
}
export default Shoppingpage