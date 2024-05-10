const apiUrl = `${Cypress.env("apiUrl")}`;

describe("Test Panier", () => {
  it(" TEST 1_Ajouter 20 articles dans le panier si le stock est suffisant vi l'API", () => {
    cy.request("POST", `${apiUrl}/login`, {
      username: "test2@test.fr",
      password: "testtest",
    }).then((response) => {
      const token = response.body.token;

      cy.request({
        method: "GET",
        url: `${apiUrl}/products/4`, // exemple ID '4'
        headers: {
          // Vous avez oublié cette ligne
          Authorization: `Bearer ${token}`,
        }, // Et cette parenthèse fermante est en trop
      }).then((productResponse) => {
        const stockAvailable = productResponse.body.availableStock;
        cy.log("Stock disponible :", stockAvailable);
        if (stockAvailable >= 20) {
          cy.request({
            method: "PUT",
            url: `${apiUrl}/orders/add`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: {
              quantity: 20,
              product: 4, // exemple ID'4'
            },
          }).then((response) => {
            expect(response.status).to.eq(200); // Vérifie que l'ajout au panier s'est bien déroulé
          });
          // Vérifie que le stock a été réduit du nombre de produits ajoutés au panier
          cy.request({
            method: "GET",
            url: `${apiUrl}/products/4`, // Remplacez '4' par l'identifiant du produit que vous souhaitez vérifier
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((updatedProductResponse) => {
            expect(updatedProductResponse.body.availableStock).to.eq(
              stockAvailable - 20
            );
          });
        } else {
          cy.log(
            "Le stock n'est pas disponible mais les 20 articles sont dans le panier."
          );
        }
      });
    });
  });
});
