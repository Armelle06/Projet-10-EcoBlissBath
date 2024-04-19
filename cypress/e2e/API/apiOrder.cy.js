describe("Acces panier/ Order sans authorisation( test1 V1)", () => {
  it(" page 401 error ", () => {
    cy.request({
      url: `${Cypress.env("apiURL")}/orders`,
      headers: {
        // En-tête Authorization vide pour spécifier que l'utilisateur n'est pas connecté
        Authorization: "", //
      },
      failOnStatusCode: false, // Permet de ne pas échouer le test si la requête retourne une erreur
    }).then((response) => {
      expect(response.status).to.eq(401); //403 erreur
    });
  });
});

////TEST KO ... attendu 200 mais la reponse est 405!!!!! (capture ecran le 18/04/24 15h:07)

describe("Ajout d'un produit disponible au panier", () => {
  it("retourne un code de statut 200 après avoir ajouté un produit au panier", () => {
    // Envoyer une requête POST à l'endpoint d'ajout au panier avec les détails du produit
    cy.request({
      method: "POST",
      url: "http://localhost:8081/orders/add",
      body: {
        productId: "7", // l'ID du produit
        quantity: 1, // La quantité du produit à ajouter au panier
      },
      failOnStatusCode: false, // Ne pas échouer le test si le code de statut n'est pas 200
    }).then((response) => {
      // Vérifier que la réponse contient un code de statut 200
      expect(response.status).to.eq(200);
    });
  });
});
// avec connexion//
describe("Ajout d'un produit disponible au panier", () => {
  it("retourne un code de statut 200 après avoir ajouté un produit au panier", () => {
    // Se connecter pour obtenir un jeton d'authentification
    cy.request({
      method: "POST",
      url: "http://localhost:8081/login",
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
        method: "POST",
        url: "http://localhost:8081/orders/add",
        body: {
          productId: "7", // l'ID du produit
          quantity: 1, // La quantité du produit à ajouter au panier
        },
        headers: {
          Authorization: `Bearer ${token}`, // Inclure le jeton d'authentification dans les en-têtes
        },
        failOnStatusCode: false, // Ne pas échouer le test si le code de statut n'est pas 200
      }).then((response) => {
        // Vérifier que la réponse contient un code de statut 200
        expect(response.status).to.eq(200);
      });
    });
  });
});
