import { faker } from "@faker-js/faker";

const fakeLastName = faker.person.lastName();
const fakeFirstName = faker.person.firstName();
const fakeEmail = faker.internet.email();
const fakePassword = faker.internet.password({ length: 20 });

// KO test responsive  sur iphone 6 apres avoir verifier descktock
// screeshort le 23/04 17h19

describe("login en iphone6", () => {
  it("TEST 1_Barre nav-link-cart no visible", () => {
    cy.wait(4000);
    cy.viewport("iphone-6");
    cy.visit("http://localhost:8080/#/register");
    cy.getBySel("register-input-lastname").type(fakeLastName);
    cy.getBySel("register-input-firstname").type(fakeFirstName);
    cy.getBySel("register-input-email").type(fakeEmail);
    cy.getBySel("register-input-password").type(fakePassword);
    cy.getBySel("register-input-password-confirm").type(fakePassword);
    cy.getBySel("register-submit").click();
    cy.getBySel("nav-link-cart")
      .should("be.visible") // header nav-link-cart pas visible
      .should("contain", "Mon panier");
    cy.get('[data-cy="nav-link-logout"]')
      .should("be.visible")
      .should("contain", "Déconnexion");
  });
});
