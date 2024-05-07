import { faker } from "@faker-js/faker"; // Faker.js est une bibliothèque JavaScript qui permet de générer des données factices de manière aléatoire.

const fakeLastName = faker.person.lastName();
const fakeFirstName = faker.person.firstName();
const fakeEmail = faker.internet.email();
const fakePassword = faker.internet.password({ length: 20 });
const messageMerci = "Merci de remplir correctement tous les champs";

describe("login", () => {
  it("TEST 1_Login message -identifiants incorrects-sans faker ", () => {
    cy.visit("");
    cy.getBySel("nav-link-login").click();
    cy.getBySel("login-input-username").type("test2@test.fr");
    cy.getBySel("login-input-password").type("12341234");
    cy.getBySel("login-submit").click();
    cy.contains("Identifiants incorrects").should("be.visible");
  });
});
describe("login", () => {
  it("TEST 2_Login message -identifiants incorrects- avec faker ", () => {
    cy.visit("");
    cy.getBySel("nav-link-login").click();
    cy.getBySel("login-input-username").type(fakeEmail);
    cy.getBySel("login-input-password").type(fakePassword);
    cy.getBySel("login-submit").click();
    cy.contains("Identifiants incorrects").should("be.visible");
  });

  it("TEST 3_Login, message -Merci de remplir correctement tous les champs-", () => {
    cy.visit("");
    cy.getBySel("nav-link-login").click();
    cy.getBySel("login-submit").click();
    cy.contains(messageMerci).should("be.visible");
  });

  it("TEST 4_Login sans lastname -MessageMerci-", () => {
    cy.visit("http://localhost:8080/#/register");
    cy.getBySel("register-input-email").type(fakeEmail);
    cy.getBySel("register-input-password").type(fakePassword);
    cy.getBySel("register-input-password-confirm").type(fakePassword);
    cy.getBySel("register-submit").click();
    cy.getBySel("register-errors")
      .should("be.visible")
      .should("contain", messageMerci);
  });
  it("TEST 5_Login sans firstname -MessageMerci-", () => {
    cy.visit("http://localhost:8080/#/register");
    cy.getBySel("register-input-lastname").type(fakeLastName);
    cy.getBySel("register-input-email").type(fakeEmail);
    cy.getBySel("register-input-password").type(fakePassword);
    cy.getBySel("register-input-password-confirm").type(fakePassword);
    cy.getBySel("register-submit").click();
    cy.getBySel("register-errors")
      .should("be.visible")
      .should("contain", messageMerci);
  });

  it("TEST 6_Inscription nouvel utilisateur xx", () => {
    cy.visit("http://localhost:8080/#/register");
    cy.getBySel("register-input-lastname").type(fakeLastName);
    cy.getBySel("register-input-firstname").type(fakeFirstName);
    cy.getBySel("register-input-email").type(fakeEmail);
    cy.getBySel("register-input-password").type(fakePassword);
    cy.getBySel("register-input-password-confirm").type(fakePassword);
    cy.getBySel("register-submit").click();
    cy.getBySel("nav-link-cart")
      .should("be.visible")
      .should("contain", "Mon panier");
    cy.getBySel("nav-link-logout")
      .should("be.visible")
      .should("contain", "Déconnexion");
  });
});
