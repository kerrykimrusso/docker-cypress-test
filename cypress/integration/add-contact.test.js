describe('Users', function() {
  beforeEach(function() {
    cy.fixture('contacts').then(({ 
      existingContacts,
      newContact,
    }) => {
      cy.wrap(newContact).as('newContact');
      
      cy.server()
        .route({
          method: 'GET',
          url: Cypress.env('SERVER_URL') + '/contacts',
          response: existingContacts,
        }).as('getContacts')
        .route({
          method: 'POST',
          url: Cypress.env('SERVER_URL') + '/contacts',
          response: newContact,
        }).as('postContact');
    });
  });

  it('can add a new contact', function() {
    cy.visit('/', {
      // https://github.com/cypress-io/cypress/issues/95#issuecomment-281273126
      onBeforeLoad: (win) => {
        win.fetch = null;
      }
    })
      .wait('@getContacts')
      .get('.add-contact')
      .click()
      .get('input[name="name"]')
      .type(this.newContact.name)
      .get('input[name="email"]')
      .type(this.newContact.email)
      .get('button')
      .click()
      .wait('@postContact')
      .location('pathname').should('eq', '/')
      .get('.contact-list > li')
      .should('have.length', 4);
  });
})