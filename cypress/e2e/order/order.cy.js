describe("Test de requête sur les données confidentielles avant connexion", () => {
  it("TEST 1_Devrait recevoir une erreur 401 lors de l'accès au panier sans être connecté", () => {
    // Effectuer la requête sur les données confidentielles (le panier) sans être connecté
    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}` + "/orders",
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
        expect(response.body.orderLines[0].product).to.include(expectedProduct); //compare l'objet apres l'ajout au panier

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
          }; //verifie que const  expectProduct est le 1 ere element de la liste
          expect(response.body.orderLines[0].product).to.include(
            expectedProduct // Include =assertion qui verifie les valeurs de l'objet (expectedProduct) mais cette fois récupéré avec GET
          );
        });
      });
    });
  });

  it("TEST 3_Devrait pas permettre d'ajouter une quantité null", () => {
    cy.login();
    cy.getBySel("nav-link-products").should("be.visible").click();
    cy.getBySel("product").eq(1).contains("Consulter").click();
    // Ajouter 0 au stock
    cy.getBySel("detail-product-quantity").clear().focus().type("0");
    cy.getBySel("detail-product-add").click();
    // Verifie si le produit est ajouté au panier ou non
    cy.wait(6000);

    cy.getBySel("nav-link-cart").click();
    // Vérifie que le produit n'est pas présent dans le panier et que le panier est vide
    cy.getBySel("cart-empty")
      .should("exist") // Section no exist car c est la message du panier vide
      .and("contain", "Votre panier est vide");
  }); //Test KO

  it("TEST 4_Devrait pas ajouter un produit en rupture de stock", () => {
    cy.login();
    cy.getBySel("nav-link-products").click();
    cy.getBySel("product").eq(0).contains("Consulter").click(); // 1 er element de ma liste product consulter

    cy.getBySel("detail-product-quantity").clear().type("1"); // ajouter 1 en quantité
    cy.getBySel("detail-product-add").click();
    cy.wait(9000);
    cy.url().should("contain", "cart");
  }); //test KO
});
