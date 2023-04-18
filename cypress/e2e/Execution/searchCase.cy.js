/* Here we have a test to search for a current processApp into the ProcessApp view. 
/* As the other test, we also need to clearLocalStorage and cookies to avoid login problems,
  and we set the variables that we are going to used to be more accurate with the perform.*/

const language = 'English'; // Current language from the Execution Design.
const username = 'xxx';
const password = 'xxx!';
const processAppName = 'PET-09'; // searched value from processApps.
const ansible = 'pe-2606';
// const language = ("German")

describe('Log into de Execution App', function () {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

  });

  it('Access to URL & Login', function () {
    cy.intercept({
      method: 'GET',
      url: `https://${ansible}.gbtecdev.net/process-execution/studio/processes#state=5d00884c-a5a7-417d-856b-4945e84822c7&session_state=fedc5129-b395-493c-b398-1e6bce8322c4&code=609728f6-b11d-4ec9-82c2-bfa02077db3f.fedc5129-b395-493c-b398-1e6bce8322c4.54548925-2057-498b-8c71-a9453f7714ea`
    }).as('getProcesses');

    cy.visit(
      `https://${ansible}.gbtecdev.net/auth/realms/6763599e-e0c4-4b96-838b-ff7d3e565dd1/protocol/openid-connect/auth?client_id=webclient&redirect_uri=https%3A%2F%2Frc.gbtecdev.net%2Fprocess-execution%2Fstudio%2Fprocesses&state=ab409391-09cc-4413-8586-d08b11caa92d&response_mode=fragment&response_type=code&scope=openid&nonce=bb4e3c9a-e294-48de-8c61-2b6ae7d93e67`
    );
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('#kc-login').click();
    cy.wait(3000);
  });

  it('Select Current Language', function () {
    cy.get('[routerlink="/content-language"]').click();
    cy.contains(language).click();
  });

  it('Enter to active ProcessApps', function () {
    cy.get('[data-cy=main-nav-processes]').click();
    cy.intercept('https://rc.gbtecdev.net/process-execution/studio/processes'); // access to processapps main page
    cy.get('[data-cy=toolbar-search-input]').type(processAppName);
    cy.get('.mat-form-field-infix').type('{enter}'); // enter comand for searching start
  });
});