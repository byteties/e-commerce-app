describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the login form', () => {
    cy.get('input[name="username"]').should('be.visible');  
    cy.get('input[name="password"]').should('be.visible');  
    cy.contains('Login').should('be.visible');  
  });

  it('should log in successfully with valid credentials', () => {
    cy.get('input[name="username"]').type('admin');  
    cy.get('input[name="password"]').type('123456');  
    cy.contains('Login').click();  
    cy.url().should('eq', 'http://localhost:4200/products');  
  });

  it('should show an error with invalid credentials', () => {
    cy.get('input[name="username"]').type('invaliduser');
    cy.get('input[name="password"]').type('invalidpass');
    cy.contains('Login').click(); 
    cy.contains('Invalid username or password').should('be.visible');  
  });
});
