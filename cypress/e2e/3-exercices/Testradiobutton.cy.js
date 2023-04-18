/* This is an example about the behaviour of the radio button on interactions with formularies.*/

/* Sometimes is necesary to activate the autocomplete funcionality, to allow
 cypress to detect the inputs that we are handling. For this, we use the comand reference types = cypress, to allow this. */

/// <reference types="cypress" />

describe('Automate RADIO BUTTIONS', function () {
  it('Automate simple RADIO BUTTON', function () {
    cy.visit('https://www.seleniumeasy.com/test/');
    cy.get('.at-cm-no-button').click(); // banner toast with the publicity message

    cy.get(':nth-child(3) > :nth-child(1) > .tree-indicator').click();

    cy.get(':nth-child(3) > :nth-child(1) > ul > :nth-child(3) > a').click();
  });
});
