describe('API test', ()=>{
  const apiBase=Cypress.env('apiUrl');
  const apiLogin=`${apiBase}/login`;
  
  const identify ={
      username:'test2@test.fr',
      password:'testtest', 
  }

  let token='';

  before(()=>{
    cy.request('POST', apiLogin, identify).then((Response)=>{
      expect(Response.status).to.eq(200);
      window.localStorage.setItem('token',Response.body.token);
    });
  });

  it('should return 401 or 403 when accessing order without auth', ()=>{
    cy.request({
      method:'GET',
      url:'http://localhost:8081/orders',
      failOnStatusCode:false
    }).its('status').should('be.oneOf',[401,403]);
  });

  it('should retun a list on products with auth',()=>{
    cy.request({
      method:'GET',
      url:'/orders',
      failOnStatusCode:true
    }).its('status').should('eq',200);
  });

  

});

