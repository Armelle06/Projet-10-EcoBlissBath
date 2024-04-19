describe("smoke test", () => {
  it("Vérifier la présence des champs et boutons de connexion", () => {
    cy.visit("http://localhost:8080");
    cy.getBySel("nav-link-login").click(); //clic "connection nav-link"
    cy.getBySel("login-input-username").should("exist");
    cy.getBySel("login-input-password").should("exist");
    cy.getBySel("login-submit").should("exist");
  });

  it("Vérifier la présence d'ajouter au panier' et la disponibilité du produit login ok", () => {
    //connection avec Email et MdP
    cy.visit("http://localhost:8080");
    cy.getBySel("nav-link-login").click();
    cy.getBySel("login-input-username").type("test2@test.fr");
    cy.getBySel("login-input-password").type("testtest");
    cy.getBySel("login-submit").click();
    cy.contains("Mon panier").should("be.visible"); //"Mon panier" a la place de "Connexion"

    //Sélectionner un produit depuis la page "Produits"
    cy.getBySel("nav-link-products").click();
    cy.get("button").eq(5).should("contain", "Consulter").click();

    //vérifier la présence bouton "ajouter au panier" et du champ de disponibilité du produit.
    cy.getBySel("detail-product-add").should("exist");
    cy.getBySel("detail-product-stock").should("exist");
  });
});
