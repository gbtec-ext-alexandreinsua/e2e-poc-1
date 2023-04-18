/* Sometimes is necesary to activate the autocomplete funcionality, to allow
 cypress to detect the inputs that we are handling. For this, we use the comand reference types = cypress, to allow this. */

/* This case is very similar to the one provided in Checkbox.text.js, both belongs to the same basic examples */
/// <reference types="cypress" />

describe('Web automation', function () {
  context('Automatic textbox', function () {
    it('Type Text', function () {
      cy.visit('https://www.seleniumeasy.com/test/');

      cy.get('.at-cm-no-button').click();

      cy.get(':nth-child(3) > :nth-child(1) > .tree-indicator').click();

      cy.get(':nth-child(3) > :nth-child(1) > ul > :nth-child(1) > a').click();

      cy.get('.form-group > #user-message').type('Introduce texto para test');

      cy.get('#get-input > .btn').click();
    });

    it('Type values', function () {
      cy.get('#sum1').type('25');
      cy.get('#sum2').type('15');

      cy.get('#gettotal > .btn').click();
    });

    ///Whit this, i can check the validation, and see if the text is equals the one that i provide.
    it('Check validation texts', function () {
      cy.get('#display').should('have.text', 'Introduce texto para test');

      cy.get('#displayvalue').should('have.text', '40');
    });
  });
});
