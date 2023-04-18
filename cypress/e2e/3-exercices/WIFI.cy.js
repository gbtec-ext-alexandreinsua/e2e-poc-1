/* This is a quick test to check the conexion status. As you can see, the bot just access to google and search
the first coincidende that is provided. Arrow down to select the first coincidence and then the page will be accesed.
Quick test accepting google data policy and search. */
describe('WIFI test', function () {
  it('Google', function () {
    cy.visit('https://www.google.es/');
    cy.wait(5000);
    cy.get('#L2AGLb > .jyfHyd').click();
  });

  it('Search velocity test', function () {
    cy.get('.gLFyf').type('test de velocidad');
    cy.get('.gLFyf').type('{downarrow}{enter}');
    cy.wait(3000);
  });

  it('Begin test', function () {
    cy.get('#knowledge-verticals-internetspeedtest__test_button > .fSXkBc').click();
  });
});
