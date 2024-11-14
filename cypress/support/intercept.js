Cypress.Commands.add("setupInterceptions", () => {
    cy.intercept('POST', '**/naLogImpressions').as('sendedForm');
});
beforeEach(() => {
    cy.setupInterceptions();
});