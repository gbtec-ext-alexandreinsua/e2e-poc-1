/* This is an example about the behaviour of the checkbox on interactions with formularies */
describe('Automation tests', function () {
  context('Checkbox simple', function () {
    it('Type Text', function () {
      cy.visit('https://www.seleniumeasy.com/test/'); /// We use this like MOcha, to access to the current page that we want.

      cy.get('.at-cm-no-button').click(); // Click into the banner message.

      cy.get(':nth-child(3) > :nth-child(1) > .tree-indicator').click();

      cy.get(':nth-child(3) > :nth-child(1) > ul > :nth-child(2) > a').click();

      cy.get('#isAgeSelected').click();

      // Check the validation of the checkbox

      cy.get('#txtAge').should('have.text', 'Success - Check box is checked'); // We receive the validation and the message abroad the "OK"
    });

    it('multiple checkbox and validation', function () {
      // It doesnt mind to use click, or check when we are talking about checkbox, both of the commands are usefull for that type of
      cy.get(':nth-child(3) > label > .cb1-element').click();
      cy.get(':nth-child(5) > label > .cb1-element').check();
      cy.get(':nth-child(6) > label > .cb1-element').click();

      //cy.get('#check1').click()

      cy.get(':nth-child(6) > label > .cb1-element').should('be.checked');
    });
  });
});
