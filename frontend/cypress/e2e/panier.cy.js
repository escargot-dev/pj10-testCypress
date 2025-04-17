/// <reference types="cypress" />

describe('Gestion du panier', () => {
  beforeEach(() => {
    cy.login('test2@test.fr', 'testtest'); // commande personnalisée
  });

  it('Ajout au panier si stock > 1', () => {
    cy.visit('/produits');
    cy.get('.product').first().within(() => {
      cy.get('.stock').invoke('text').then(stock => {
        if (parseInt(stock) > 1) {
          cy.contains('Ajouter au panier').click();
          cy.get('.panier').should('contain', '1');
        }
      });
    });
  });

  it('Le stock se met à jour après ajout au panier', () => {
    // à adapter avec l'élément précis du DOM
  });

  it('Vérifie les limites de quantités (valeurs négatives ou > 20)', () => {
    cy.get('input[type=number]').clear().type('-1');
    cy.get('.error').should('contain', 'valeur non valide');

    cy.get('input[type=number]').clear().type('21');
    cy.get('.error').should('contain', 'valeur non valide');
  });
});
