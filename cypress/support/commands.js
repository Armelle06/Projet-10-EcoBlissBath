//commands pour ne pas repeter le selecteur data-cy dans le HTML
Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-cy= ${selector}]`, ...args);
});

// commands login pour une connection sans a avoir a exporter ni importer  le dossier
Cypress.Commands.add("login", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");
  cy.visit("");
  cy.getBySel("nav-link-login").click();
  cy.getBySel("login-input-username").type(username);
  cy.getBySel("login-input-password").type(password);
  cy.getBySel("login-submit").click();
  cy.contains("Mon panier").should("be.visible");
});
