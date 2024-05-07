const apiUrl = `${Cypress.env("apiUrl")}`;

describe("Test Panier", () => {
  it(" TEST 1 _Mettre un produit spécifique en rupture de stock dans le panier", () => {
    cy.request("POST", `${apiUrl}` + "/login", {
      username: "test2@test.fr",
      password: "testtest",
    }).then((response) => {
      const token = response.body.token;
      cy.request({
        method: "GET",
        url: apiUrl + "/products/4", // Remplacez '4' par l'identifiant du produit que vous souhaitez vérifier
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((productResponse) => {
        // Vérifiez si le produit est en stock
        if (productResponse.body.stock > 0) {
          cy.request({
            method: "PUT", //anomalie detectée dans le test manuel car ecrit POST
            url: apiUrl + "/orders/add",
            headers: {
              Authorization: "Bearer " + token,
            },
            body: {
              quantity: 1,
              product: 4,
            },
          }).then((response) => {
            cy.wait(400);
            expect(response.status).to.eq(200); // anomalie, vous ne devriez pas pouvoir l'ajouter au panier - il est en rupture de stock.
            const listProduct = {
              name: "Chuchotements d'été",
              description:
                "Savon surgras à l'huile d'olive, particulièrement utile contre la peau sèche.",
              price: 37,
              picture:
                "https://cdn.pixabay.com/photo/2017/09/07/19/43/soap-2726387_960_720.jpg",
            };
            expect(response.body.orderLines[0].product).to.include(listProduct); //[0] veut dire le 1 er element de la liste
          });
          cy.visit("/product/4"); // visit l article id4
          // Vérifie que le stock a été réduit du nombre de produits ajoutés au panier
          cy.get("detail-product-stock").should(
            "have.text",
            productResponse.body.stock - 1
          );
        } else {
          //apparition du log , le produit s ajoute malgres sont manque de stock
          cy.log(
            "Le produit ne devrait pas etre ajouté au panier car rupture de cette article." // mais il l'est! test KO
          );
        }
      });
    });
  });

  it("TEST 2_ Ajouter un produit négatif (-1)", () => {
    cy.login(); //sur la page du site

    //Clicker sur le produit (3 eme bouton Consulter)
    cy.getBySel("nav-link-products").click();
    cy.get("button").eq(2).should("contain", "Consulter").click();

    //ajoutez au panier une quantité négative
    cy.getBySel("detail-product-quantity").click();
    cy.getBySel("detail-product-quantity").clear();
    cy.getBySel("detail-product-quantity").type("-1");
    cy.getBySel("detail-product-add").click();

    //verification du panier , le produit ne doit pas être présent
    cy.getBySel("nav-link-cart").click();
    cy.contains("Poussière de lune").should("not.exist");
  });

  // TEST KO
  it("TEST 3_Ajouter une quantité supérieur au stock ", () => {
    cy.login();

    // Cliquez sur le produit (3e bouton Consulter)
    cy.getBySel("nav-link-products").click();
    cy.get("button").eq(2).should("contain", "Consulter").click();

    // Ajoutez 20 au panier
    cy.getBySel("detail-product-quantity").click();
    cy.getBySel("detail-product-quantity").clear();
    cy.getBySel("detail-product-quantity").type("20");
    cy.getBySel("detail-product-add").click();

    // Vérifiez que le produit n'est pas ajouté au panier
    cy.getBySel("nav-link-cart").click();
    cy.wait(10000);
    cy.contains("Poussière de lune").should("not.exist"); //test en echec le contains "exist"
  });
  it("TEST 4_Vérifier la liste des produits dans le panier (Test 1/GET v1)", () => {
    cy.request("POST", `${Cypress.env("apiUrl")}` + "/login", {
      username: "test2@test.fr",
      password: "testtest",
    }).then((response) => {
      const token = response.body.token;
      cy.request({
        method: "GET",
        url: apiUrl + "/products/4", // Remplacez '4' par l'identifiant du produit que vous souhaitez vérifier
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((productResponse) => {
        // Vérifiez si le produit est en stock
        if (productResponse.body.availableStock > 0) {
          cy.request({
            method: "PUT", //anomalie detecté dans les test manuel car ecrit POST
            url: apiUrl + "/orders/add",
            headers: {
              Authorization: "Bearer " + token,
            },
            body: {
              quantity: 1,
              product: 4,
            },
          }).then((response) => {
            expect(response.status).to.eq(200); //anomalie detecté car pas de stock sur cette articles
            expect(response.body).to.be.an("array"); // Assurez-vous que la réponse est un tableau

            // Parcours chaque produit dans la liste et vérifiez ses détails
            response.body.forEach((product) => {
              // Vérifiez les détails du produit, par exemple :
              expect(product).to.have.property("name"); // Assurez-vous que le produit a un nom
              expect(product).to.have.property("price"); // Assurez-vous que le produit a un prix
              // Vous pouvez ajouter d'autres vérifications en fonction de vos besoins
            });
          });
        }
      });
    });
  });
});
