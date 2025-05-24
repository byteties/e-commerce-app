describe('Checkout Page', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('input[name="username"]').type('admin');  
        cy.get('input[name="password"]').type('123456');  
        cy.contains('Login').click();
        cy.wait(1000);
        cy.get('.add-to-cart-btn').first().click();
        cy.get('.add-to-cart-btn').first().click(); 
        cy.visit('/checkout');
        cy.wait(1000);
    });
  
    it('should display order summary when cart has products', () => {
      cy.get('table').should('be.visible');
      cy.get('thead tr').should('contain', 'Product').and('contain', 'Quantity').and('contain', 'Price');
      cy.get('tbody tr').should('have.length.greaterThan', 0); 
    });
  
    it('should show total items and total price', () => {
      cy.contains('Total Items:').should('be.visible');
      cy.contains('Total Price:').should('be.visible');
    });
  
    it('should allow user to input name, email, and address', () => {
      cy.get('#userName').type('John Doe').should('have.value', 'John Doe');
      cy.get('#userEmail').type('john@example.com').should('have.value', 'john@example.com');
      cy.get('#userAddress').type('123 Main St, Springfield').should('have.value', '123 Main St, Springfield');
    });
  
    it('should navigate back to cart when Back to Cart button is clicked', () => {
      cy.get('button.back-to-cart-btn').click();
      cy.url().should('include', '/cart');
    });
  
    it('should place an order when Place Order button is clicked', () => {
      cy.get('button').contains('Place Order').click();
      cy.get('.mat-mdc-snack-bar-label').should('be.visible');
      cy.get('.mat-mdc-snack-bar-label').should('contain', 'Order Placed Successfully!');
      cy.get('.count-cart').should('not.exist');
    });
  });
  