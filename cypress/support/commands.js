import 'cypress-file-upload';

Cypress.Commands.add('getButtonByExactText', (text) => {
  cy.get('button').filter((index, element) => element.innerText.trim() === text);
});

Cypress.Commands.add('getIframeBody', (iframeSelector) => {
  return cy
    .get(iframeSelector)
    .its('0.contentDocument.body').should('not.be.empty')
    .then(cy.wrap);
});