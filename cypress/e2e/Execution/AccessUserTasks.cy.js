/* This is a basic example of how can we access to the execution App, and navigate to the tasks section. This behaviour will
change in a near future so the idea of this test will change soon.  
As the other test, we also need to clearLocalStorage and cookies to avoid login problems,
and we set the variables that we are going to used to be more accurate with the perform.*/

const language = 'English'; // Current language from the Execution Design.
// const language = ("German");
const username = 'test@gbtec.de';
const password = 'test1!';
const baseURL = 'pe-2606.ansible';
//const baseURL = 'Nightly';
const tenant = "ac50692e-aefb-4a3a-b05b-890790b2b307";
const processAppName = 'Order process'; // searched value from processApps search.
const caseName = 'Northrop F5 Tiger';


beforeEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
});

describe('Log into de Execution App', function () {
  /// tittles inside the test steps withing the cypress interface

  it('Access to URL & Login', function () {

    cy.intercept({
      method: 'GET',
      url: new RegExp(`https://(.*).gbtecdev.net/process-execution/api/tenants/(.*)/stages/prod/tasks`)
    }).as('ExecutionTasksSection');

    cy.visit(
      `https://${baseURL}.gbtecdev.net/process-execution/app/tasks/`

      /*you can visit the main page of the execution with the specific URL, because for all the interactions, you will need to 
      access to the login page, due to the cy.clearLocalStorage*/

    );
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('#kc-login').click();
    cy.wait("@ExecutionTasksSection")
  });
});