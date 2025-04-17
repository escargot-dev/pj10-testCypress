/// <reference types="cypress" />

describe('Tests d’API Eco Bliss Bath', ()=>{

  it('GET /orders sans être connecté doit renvoyer 401', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8081/orders',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it('POST /login - utilisateur connu retourne 200', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/login',
      body: {
        username: 'test2@test.fr',
        password: 'testtest'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  context('Avec authentification', () => {

    let token='';

    beforeEach(() => {
      cy.login('test2@test.fr', 'testtest'); 
    });

    it('PUT /orders/add ajoute un produit dispo au panier', () => {
      let randomQuantity=1;
      cy.request('/products').then((response) => {       
        let productId = response.body[Math.floor(Math.random() * response.body.length)].id;
        
        cy.request({
          method: 'PUT',
          url: '/orders/add',
          body: {
            productId: productId,
            quantity: randomQuantity
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((putResponse) => {
          expect(putResponse.status).to.eq(200);
        });
      });
    });

    it('POST /orders/add - produit en rupture => erreur (à adapter selon l’API)', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/orders/add',
        headers: {
          Authorization: `Bearer ${token}`
        },
        failOnStatusCode: false,
        body: {
          product: 3, 
          quantity: 1
        }
      }).then((response) => {
        expect([400, 409]).to.include(response.status); 
      });
    });

    it('POST /reviews ajoute un avis', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/reviews',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          product: 3,
          rating: 5,
          comment: 'Excellent produit !'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
    

  });
});