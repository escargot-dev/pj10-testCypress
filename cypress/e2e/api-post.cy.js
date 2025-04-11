describe('API - Tests POST avec login automatique à chaque test', () =>{
  const apiBase = Cypress.env('apiUrl');
  const apiLogin = `${apiBase}/login`;
  const apiAddToCart = `${apiBase}/orders/add`;
  const apiReviews = `${apiBase}/reviews`;

  const credentials ={
    username:'test2@test.fr',
    password:'testtest', 
}

let token='';

before(() => {
  cy.request('POST', apiLogin, credentials).then((res) => {
    expect(res.status).to.eq(200);
    token = res.body.token;
  });
});

it('should add a product to the cart', () => {
  cy.request({
    method: 'PUT',
    url: apiAddToCart,
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: {
      productId: 2,
      quantity: 1
    }
  }).then((res) => {
    expect([200, 201]).to.include(res.status);
  });
});

it('should add a product review', () => {
  cy.request({
    method: 'POST',
    url: apiReviews,
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: {
      productId: 1,
      rating: 4,
      comment: 'Top produit !'
    }
  }).then((res) => {
    expect([200, 201]).to.include(res.status);
  });
});

});