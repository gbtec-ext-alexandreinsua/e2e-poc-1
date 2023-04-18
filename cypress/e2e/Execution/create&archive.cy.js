/* This is a basic example in where you can access to the execution login page. This is related to an existing ansible.
The idea here is to provide a functional example about how to create a case from an specific proccess, set the variable processAppName, 
and then delete it using this saved variable. */


// const baseURL = 'pe-2606.ansible';
const baseURL = 'pe-2606.ansible';
const language = 'English'; // Currentge from the Execution Design.
// const language = ("German");
const username = 'test@gbtec.de';
const password = 'test1!';
const processAppName = 'Test 0'; // searched value from processApps search.
const caseName = 'CypressGame';

/* Sometimes,the diffentent browser can detect that you are using a bot to access to the different pages, so then,
all the data related with logins is still get even you have old one, wich is handling an error at the moment to acces to a 
login page. For that, you can use BeforeEach, to perform a clearcookies and clearlocalStorage before every test.*/

beforeEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();

  cy.intercept({
    method: 'GET',
    url: new RegExp(`https://(.*).gbtecdev.net/process-execution/app/processes/`)
  }).as('LoginSuccess');

  cy.visit(`https://${baseURL}.gbtecdev.net/process-execution/app/processes/`);
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('#kc-login').click();
  cy.wait("@LoginSuccess");
});

describe('Found specific case', function () {

  it('Enter to active ProcessApps', function () {

    cy.intercept({
      method: 'GET',
      url: new RegExp(`https://(.*).gbtecdev.net/process-execution/api/tenants/(.*)/stages/prod/processes(.*)=Test%200`)
    }).as('SpecificProccessAppInstances');
    cy.get('[data-cy=main-nav-processes]').click();
    cy.get('.mat-form-field-infix').type(processAppName).click();
    cy.get('.mat-form-field-infix').type('{enter}');
    cy.wait("@SpecificProccessAppInstances");

    cy.intercept({
      method: 'GET',
      url: new RegExp(`https://(.*).gbtecdev.net/process-execution/api/tenants/(.*)/stages/prod/processes/(.*)/instances/`)
    }).as('ProcessAppInstanceCreation');

    cy.get(
      '.mat-card-content > .mat-list > .cdk-virtual-scroll-viewport > .cdk-virtual-scroll-content-wrapper > .list-row-wrapper > .mat-list-item > .mat-list-item-content > [data-cy=process-app-item] > .process-item-link'
    ).trigger('mouseover'); //hover button

    cy.get('[data-cy="add-process-button"]').should('be.hidden').invoke('show'); //Show hidden button

    cy.get(
      '.mat-card-content > .mat-list > .cdk-virtual-scroll-viewport > .cdk-virtual-scroll-content-wrapper > .list-row-wrapper > .mat-list-item > .mat-list-item-content > [data-cy=process-app-item] > .process-buttons-container > [data-cy=add-process-button] > .mat-icon'
    ).click();

    cy.get('[data-cy=new-case-name-input]').type(caseName);
    cy.get('[data-cy=new-case-confirm-button]').click();
    cy.wait("@ProcessAppInstanceCreation")
    cy.log(`A new case for ${processAppName} Called ${caseName} has been created`)
  });

  /* Now, we can delete the case that we have already created, accessing directly to the link of the processapp instances  */

  it('Delete case', function () {


    cy.get('[data-cy=main-nav-processes]').click();
    cy.get('.mat-form-field-infix').type(processAppName).click();
    cy.get('.mat-form-field-infix').type('{enter}');
    cy.get('.mat-card-content > .mat-list > .cdk-virtual-scroll-viewport > .cdk-virtual-scroll-content-wrapper > .list-row-wrapper > .mat-list-item > .mat-list-item-content > [data-cy=process-app-item] > .process-item-link').click()

    cy.get('.case-name').contains(caseName).click();
    cy.wait(1500)
    cy.get('[data-cy=case-context-menu]').click();
    cy.get('[data-cy=archive-case-button]').click();
    cy.get('[data-cy=confirmation-button]').click();
  });
});