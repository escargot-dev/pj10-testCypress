describe('Smoke Tests', () =>{
  it('Affiche les champs de connexion',()=>{
    cy.visit('http://localhost:8080/#/login');
    cy.getBySel('nav-link-login').click();
    cy.get('input[type=text]').should('exist');
    cy.get('input[type=password]').should('exist');
    cy.getBySel('login-submit').should('exist');
  });

  beforeEach(()=>{
    cy.login('test2@test.fr', 'testtest');
  });
  it('Boutons d’ajout au panier présents une fois connecté', () => {
    cy.getBySel('nav-link-cart').should('exist');
  });
 
  it('Champ de disponibilité produit visible', () => {
    cy.visit('http://localhost:8080/#/products/${id}')
    cy.getBySel('detail-product-stock').should('exist');
  });

})