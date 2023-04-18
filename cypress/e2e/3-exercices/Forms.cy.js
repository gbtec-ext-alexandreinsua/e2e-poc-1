/* Sometimes is necesary to activate the autocomplete funcionality, to allow
 cypress to detect the inputs that we are handling. For this, we use the comand reference types = cypress, to allow this. */

/* This case is very similar to the one provided in Checkbox.text.js, both belongs to the same basic examples */

/// <reference types="cypress" />

describe('Forms Editor Automation', function () {
  /// Simple test about some type text

  it('Forms', function () {
    cy.visit('https://www.seleniumeasy.com/test/input-form-demo.html');
    cy.get("select['name= state']").select('Florida').should('have.value', 'Florida');
  });
});
