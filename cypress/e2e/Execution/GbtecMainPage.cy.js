/* This is a basic example in where you can access to the main page of GBtec company, and navigate for the 
different labels to get into the ProcessExecution Platform
 
Sometimes,the diffentent browser can detect that you are using a bot to access to the different pages, so then,
all the data related with logins is still get even you have old one, wich is handling an error at the moment to acces to a 
login page. For that, you can use BeforeEach, to perform a clearcookies and clearlocalStorage before every test.*/
beforeEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
});

describe('Access to GBTEC', function () {

  it('Access to URL & Login', function () {

    cy.intercept({
      method: 'GET',
      url: new RegExp(`https://cdn.cookielaw.org/consent/`)
    }).as('CookiesBanner');

    cy.visit('https://www.gbtec.com/');
    cy.wait("@CookiesBanner");

    cy.get('#onetrust-accept-btn-handler').click();
  });

  it('Access BIC Execution Platform', function () {
    cy.get(':nth-child(1) > .main-navigation__link-lvl-1').click(); // LEVEL

    cy.wait(3000);
    cy.contains('BIC Process Execution').click(); // sublevel

  });
});