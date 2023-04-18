/* This is a visual example of how to interact with different containers. In to the proccess Execuiton, we usually use
this wheeler to pick up volunteers to explain some terms. For that, there is this test script which access to the 
randomwheeler page, input the name of the volunteers, and the perform the behaviour of the wheeler. */

const numberofpickups = 1; // nº of wheeler pickups to perform. We can use a loop to stablish the number of pickups wanted.

describe("WheelerPickups", function () {
  /* As the other test, we also need to clearLocalStorage and cookies to avoid login problems,
   and we set the variables that we are going to used to be more accurate with the perform.*/

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    Cypress.Cookies.preserveOnce('session_id', 'remember_token')
  })

  it("Page access", function () {

    cy.visit("https://tools-unite.com/tools/random-picker-wheel")
    cy.wait(5000)
    cy.get('#ez-accept-all').click() //banner messaje cookies

    beforeEach(() => {
      cy.clearLocalStorage();
      cy.clearCookies();
      Cypress.Cookies.preserveOnce('session_id', 'remember_token');
    });

    it('Page access', function () {
      cy.visit('https://tools-unite.com/tools/random-picker-wheel');
      cy.wait(5000);
      cy.get('#ez-accept-all').click(); //banner messaje cookies
    });

    it('Players list and input', function () {
      cy.get('#wheel-textarea').clear();
      cy.get('#wheel-textarea')
        .type('Fabio')
        .type('{enter}')
        .type('Fran')
        .type('{enter}')
        .type('Pablo')
        .type('{enter}')
        .type('Sira')
        .type('{enter}')
        .type('Yago')
        .type('{enter}')
        .type('Christian')
        .type('{enter}')
        .type('David')
        .type('{enter}')
        .type('Alex-F')
        .type('{enter}')
        .type('Eloy')
        .type('{enter}');

      cy.wait(1000);
      cy.get('#update-wheel-btn').click();
    });
    // wheeler is updated with the current players that are going to participate in the selection.

    it('Run wheeler', function () {
      /*here you can see the current structure of the loop that we are goint to use for 
      pick up the participants.
      */

      for (let i = 0; i < numberofpickups; i++) {
        cy.get('.wheel__canvas').click();
        cy.wait(4000);
      }
    })

  })
})