describe("Test de requête sur les données confidentielles avant connexion", () => {
  it("TEST 1_Devrait recevoir une erreur 401 lors de l'accès au panier sans être connecté", () => {
    // Effectuer la requête sur les données confidentielles (le panier) sans être connecté
    cy.request({
      method: "GET",
      url: "http://localhost:8081/orders",
      failOnStatusCode: false, // Permet à la requête de réussir même si elle renvoie un code d'erreur
    }).then((response) => {
      // Vérifier que la requête a renvoyé une erreur 401
      expect(response.status).to.eq(401);
    });
  });
});

describe("Test de la fonction Panier", () => {
  //PUT  car POST n est pas correct produit spécifique disponible dans le panier et effectue les commandes
  it("TEST 2_PLacer un produit specifique disponible dans le panier", () => {
    cy.wait(4000);
    cy.request("POST", `${Cypress.env("apiUrl")}` + "/login", {
      username: "test2@test.fr",
      password: "testtest",
    }).then((response) => {
      const token = response.body.token;

      cy.request({
        method: "PUT", // Anomalie , la specification indiquait POST
        url: `${Cypress.env("apiUrl")}` + "/orders/add",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: {
          quantity: 1,
          product: 8,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);

        const expectedProduct = {
          name: "Milkyway",
          description:
            "Savon fabriqué à partir d'ingrédients naturels tels que l'huile d'olive, la cire d'abeille et l'huile essentielle de lavande.",
          price: 15,
          picture:
            "https://cdn.pixabay.com/photo/2018/01/07/04/21/lavender-3066531_960_720.jpg",
        };
        expect(response.body.orderLines[0].product).to.include(expectedProduct);

        cy.request({
          method: "GET", // apres avoir ajouter le produit avec PUT  , le GET verifie les détails du la commande
          url: `${Cypress.env("apiUrl")}` + "/orders",
          headers: {
            Authorization: "Bearer " + token,
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          const expectedProduct = {
            name: "Milkyway",
            description:
              "Savon fabriqué à partir d'ingrédients naturels tels que l'huile d'olive, la cire d'abeille et l'huile essentielle de lavande.",
            price: 15,
            picture:
              "https://cdn.pixabay.com/photo/2018/01/07/04/21/lavender-3066531_960_720.jpg",
          };
          expect(response.body.orderLines[0].product).to.include(
            expectedProduct
          );
        });
      });
    });
  });

  it("TEST 3_Devrait pas permettre d'ajouter un quantité null", () => {
    cy.login();
    cy.getBySel("nav-link-products").should("be.visible").click();
    //cy.getBySel("nav-link-products").click();
    cy.getBySel("product").eq(1).contains("Consulter").click();
    // Try adding zero quantity
    cy.getBySel("detail-product-quantity").clear().focus().type("0");
    cy.getBySel("detail-product-add").click();
    // verifie si le produit est ajouté au panier ou non
    cy.wait(2000);
    cy.url().should("not.contain", "cart");
    cy.getBySel("nav-link-cart").click();
    // Vérifie que le produit n'est pas présent dans le panier et que le panier est vide
    cy.getBySel("cart-empty")
      .should("exist")
      .and("contain", "Votre panier est vide");
  });

  it("TEST 4_Devrait pas ajouter un produit en rupture de stock", () => {
    cy.login();
    cy.getBySel("nav-link-products").click();
    cy.getBySel("product").eq(0).contains("Consulter").click(); // 1 er element de ma liste product consulter

    cy.getBySel("detail-product-quantity").clear().type("1"); // ajouter 1 en quantité
    cy.getBySel("detail-product-add").click();

    cy.url().should("contain", "cart");
  });
});
