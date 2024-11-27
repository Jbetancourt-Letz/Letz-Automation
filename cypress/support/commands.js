import 'cypress-file-upload';

Cypress.Commands.add('getButtonByExactText', (text) => {
  cy.get('button').filter((index, element) => element.innerText.trim() === text);
});

