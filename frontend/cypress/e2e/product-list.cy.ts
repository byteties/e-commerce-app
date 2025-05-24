describe('Product List', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('input[name="username"]').type('admin');  
        cy.get('input[name="password"]').type('123456');  
        cy.contains('Login').click();  
        cy.visit('/products');
      });
    it('should display products', () => {
      cy.get('.product-card').should('have.length.greaterThan', 0);
      cy.contains("Next").should('be.enabled');
      cy.contains("Previous").should('be.disabled');
    });
  
    it('should navigate to modal when view details is clicked', () => {
      cy.get('.view-details-btn').first().click();
      cy.get('.modal').should('be.visible');
    });
  
    it('should go to the next page when next is clicked', () => {
      cy.get('.next-pagination-btn').click();
      cy.wait(1000);
      cy.get('.prev-pagination-btn').should('be.enabled');
    });

    it('search Computer 2 and only show Computer 2', () => {
      cy.wait(1000);
      cy.get('input[name="search"]').type('Computer 2');
      cy.contains('Computer 2').should('be.visible');
      cy.get('.product-card').should('have.length', 1);
    });
    it('add product to cart 2 times', () => {
      cy.get('.add-to-cart-btn').first().click();
      cy.get('.add-to-cart-btn').first().click(); 
      cy.wait(1000);
      cy.get('.count-cart').should('contain', '2');
      cy.get('.view-cart-btn').click();
      cy.get('button').contains('Remove').click();
    });

    it('logout', () => {
      cy.get('.logout-btn').click();
      cy.url().should('eq', 'http://localhost:4200/');
      cy.get('input[name="username"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.contains('Login').should('be.visible'); 
    });
  });
  