/* Sometimes is necesary to activate the autocomplete funcionality, to allow
cypress to detect the inputs that we are handling. For this, we use the comand reference types = cypress, to allow this. */

/// <reference types="cypress" />

describe('Automate RADIO BUTTIONS', function () {
  it('Automate simple RADIO BUTTON ', function () {
    cy.visit('https://www.seleniumeasy.com/test/');
    cy.get('.at-cm-no-button').click(); // banner with the publicity and the cookies.

    cy.get(':nth-child(3) > :nth-child(1) > .tree-indicator').click();

    cy.get(':nth-child(3) > :nth-child(1) > ul > :nth-child(3) > a').click();

    cy.get("input[value='Female']").as('variable').first().check().should('be.checked');
    cy.get('@variable').last().should('not.be.checked');
  });
  it('radio buttons ages', function () {
    cy.get("input[name='ageGroup']")
      .eq(1)
      .check()
      .then(el => {
        let aux = el.prop('checked'); /// I check the property and set it to a new variable to used it later              expect(aux).to.be.true

        expect(el).to.have.prop('checked', true);
      });
  });
});