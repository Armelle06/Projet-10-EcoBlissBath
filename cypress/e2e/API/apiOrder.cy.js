describe("TEST 1_Acces panier/ Order sans authorisation (Test 1 v1)", () => {
  it(" page 401 error ", () => {
    cy.request({
      url: `${Cypress.env("apiUrl")}/orders`,
      headers: {
        // En-tête Authorization vide pour spécifier que l'utilisateur n'est pas connecté
        Authorization: "", //
      },
      failOnStatusCode: false, // Permet de ne pas échouer si la reponse n'est pas 200
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});

describe("TEST 2_Ajout d'un produit disponible au panier", () => {
  it("Statut 200 après avoir ajouté un produit au panier", () => {
    // Se connecter pour obtenir un jeton d'authentification
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
    }).then((loginResponse) => {
      // Vérifier que la connexion a réussi
      expect(loginResponse.status).to.eq(200);

      // Extraire le jeton d'authentification de la réponse
      const token = loginResponse.body.token;

      // Envoyer une requête POST à l'endpoint d'ajout au panier avec les détails du produit
      cy.request({
        method: "PUT",
        url: `${Cypress.env("apiUrl")}/orders/add`,
        body: {
          product: "7", // l'ID du produit
          quantity: 1, // La quantité du produit à ajouter au panier
        },
        headers: {
          Authorization: `Bearer ${token}`, // Inclure le jeton d'authentification dans les en-têtes
        },
      }).then((response) => {
        // Vérifier que la réponse contient un code de statut 200
        expect(response.status).to.eq(200);
      });
    });
  });
});
