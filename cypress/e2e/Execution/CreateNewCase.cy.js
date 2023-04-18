/* This is a basic example in where you can access to the execution login page. This is related to an existing ansible.
The idea here is how to create a case from an specific proccess, following all the steps that a normal user should do. */

// const language = ("German");
const ansible = 'pe-2606';
const username = 'test@gbtec.de';
const password = 'test1!';
const baseURL = 'pe-2606.ansible';
// const baseURL = 'rc';  
///This baseURL can be, Nightly, RC or any specific ansible system, like the one set before.
const processAppName = 'Test 0'; // searched value from processApps search.
const caseName = 'CYPREStest';

/* Sometimes,the diffentent browser can detect that you are using a bot to access to the different pages, so then,
all the data related with logins is still get even you have old one, wich is handling an error at the moment to acces to a 
login page. For that, you can use BeforeEach, to perform a clearcookies and clearlocalStorage before every test.*/
beforeEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
});
describe('Log into de Execution App', function () {
  /// esto son los titulos que aparecen dentro del test a la hora de cargar pagina

  it('Access to URL & Login', function () {

    cy.intercept({
      method: 'GET',
      url: new RegExp(`https://(.*).gbtecdev.net/process-execution/api/tenants/(.*)/stages/prod/processes`)
    }).as('ExecutionProccessAppsSection');

    cy.visit(`https://${baseURL}.gbtecdev.net/process-execution/app/processes/`);
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('#kc-login').click();
    cy.wait("@ExecutionProccessAppsSection");
  });
});

describe('Search and create cases', function () {
  it('Enter to active ProcessApps', function () {
    cy.get('[data-cy=main-nav-processes]').click();
    cy.get('.mat-form-field-infix').type(processAppName).click();
    cy.get('.mat-form-field-infix').type('{enter}');
    cy.wait(3000);
  });

  it('Hover over a case and create a new one', function () {

    cy.get(
      '.mat-card-content > .mat-list > .cdk-virtual-scroll-viewport > .cdk-virtual-scroll-content-wrapper > .list-row-wrapper > .mat-list-item > .mat-list-item-content > [data-cy=process-app-item] > .process-item-link'
    ).trigger('mouseover'); //hover

    cy.get('[data-cy="add-process-button"]').should('be.hidden').invoke('show'); //mostrar oculto

    cy.get('.mat-card-content > .mat-list > .cdk-virtual-scroll-viewport > .cdk-virtual-scroll-content-wrapper > .list-row-wrapper > .mat-list-item > .mat-list-item-content > [data-cy=process-app-item] > .process-buttons-container > [data-cy=add-process-button] > .mat-icon')
      .click()

  });

  it('Create a new case', function () {

    cy.intercept({
      method: 'GET',
      url: new RegExp(`https://(.*).gbtecdev.net/process-execution/api/tenants/(.*)/stages/prod/processes/(.*)/instances/`)
    }).as('ProcessAppInstanceCreation');


    cy.get('[data-cy=new-case-name-input]').type(caseName);
    cy.get('[data-cy=new-case-confirm-button]').click();
    cy.wait("@ProcessAppInstanceCreation")
    cy.log(`A new case for ${processAppName} has been created`)
  });
});