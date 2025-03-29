describe('BrainBase App', () => {
    it('can add a new student', () => {
      cy.visit('http://localhost:3000');
      cy.get('input').eq(0).type('John Doe');
      cy.get('input').eq(1).type('john@example.com');
      cy.get('input').eq(2).type('Learning');
      cy.contains('Add').click();
      cy.contains('John Doe');
    });
  });
  