describe('Cart Page', () => {
  
    beforeEach(() => {
        cy.visit('/');
        cy.get('input[name="username"]').type('admin');  
        cy.get('input[name="password"]').type('123456');  
        cy.contains('Login').click();
        cy.visit('/cart');
    });
  
    it('should show an empty message if the cart is empty', () => {
      cy.get('table').should('not.exist');
      cy.contains('Your cart is empty.').should('be.visible');
    });

    it('should display products in the cart', () => {
        cy.visit('/products');
        cy.get('.add-to-cart-btn').first().click();
        cy.get('.add-to-cart-btn').first().click(); 
        cy.get('.view-cart-btn').click();
        cy.get('table').should('be.visible');
        cy.get('tbody tr').should('have.length', 1);
        cy.get('button').contains('Remove').click();
      });
  
    it('should allow users to search products by name', () => {
        cy.visit('/products');
        cy.get('.add-to-cart-btn').first().click();
        cy.get('.add-to-cart-btn').first().click(); 
        cy.get('.view-cart-btn').click();
        cy.get('.search-bar').type('Car');
        cy.get('tbody tr').each((row) => {
            cy.wrap(row).should('contain', 'Car');
            cy.get('.quantity-input').should('have.value', 2);
        });
    });
  
    it('should allow users to update the quantity', () => {
      cy.get('tbody tr').first().find('input[type="number"]').clear().type('2');
      cy.get('tbody tr').first().find('input[type="number"]').should('have.value', '2');
    });
  
    it('should allow users to remove a product from the cart', () => {
      cy.get('tbody tr').first().find('button').click();
      cy.get('tbody tr').should('have.length.lessThan', 1);
    });
  
    it('should disable checkout button if cart is empty', () => {
      cy.get('button[mat-flat-button][color="accent"]').should('be.disabled');
    });
  
    it('should go back to product list page when "Back to List" is clicked', () => {
      cy.get('button.back-btn').click();
      cy.url().should('include', '/products');
    });
  
  });
  