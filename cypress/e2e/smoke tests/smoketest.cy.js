describe("smoke test / test5", () => {
  it("TEST_1 Vérifier la présence des champs et boutons de connexion", () => {
    cy.visit("");
    cy.getBySel("nav-link-login").click(); // Clic "connection nav-link"
    cy.getBySel("login-input-username").should("be.visible");
    cy.getBySel("login-input-password").should("be.visible");
    cy.getBySel("login-submit").should("be.visible");
  });

  it(" TEST_2 Vérifier la présence 'd'ajouter au panier' et la disponibilitée du produit login ok", () => {
    // Connection avec Email et MdP
    cy.visit("");
    cy.getBySel("nav-link-login").click();
    cy.getBySel("login-input-username").type("test2@test.fr");
    cy.getBySel("login-input-password").type("testtest");
    cy.getBySel("login-submit").click();
    cy.contains("Mon panier").should("be.visible"); //"Mon panier" a la place de "Connexion"

    // Sélectionner un produit depuis la page "Produits"
    cy.getBySel("nav-link-products").click();
    cy.get("button").eq(5).should("contain", "Consulter").click();

    // Vérifier la présence bouton "ajouter au panier" et du champ de disponibilité du produit.
    cy.getBySel("detail-product-add").should("be.visible");
    cy.getBySel("detail-product-stock").should("be.visible");
  });
  // Réutilisation de la fonction possible
  it("TEST_3 Connection reussi avec mon raccourci de commands.js", () => {
    cy.login();
  });
});
