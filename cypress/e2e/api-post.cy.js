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

beforeEach(() => {
  cy.request('POST', apiLogin, credentials).then((res) => {
    expect(res.status).to.eq(200);
    cy.wrap(res.body.token).as('authToken'); // 👈 stocké sous alias
  });
});

it('should add a product to the cart', () => {
  cy.get('@authToken').then((token) => {
    cy.request({
      method: 'post',
      url: apiAddToCart,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        productId: 3,
        quantity: 1,
      },
    }).then((res) => {
      expect([200, 201]).to.include(res.status);
    });
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
      "title": "string",
      "comment": "string",
      "rating": 5
    }
  }).then((res) => {
    expect([200, 201]).to.include(res.status);
  });
});

});