describe("Test api/login", () => {
  it("TEST 1_Retourne une erreur 401 pour un utilisateur inconnu", () => {
    // Envoyer une requête POST au endpoint de login avec des identifiants incorrects
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      body: {
        username: "utilisateur_inconnu",
        password: "mot_de_passe_incorrect",
      },
      failOnStatusCode: false, // Ne pas échouer le test si le code de statut n'est pas 200
    }).then((response) => {
      // Vérifier que la réponse contient un code de statut 401
      expect(response.status).to.eq(401);
    });
  });

  it("TEST 2_Retourne un code de statut 200 pour un utilisateur connu", () => {
    // Envoyer une requête POST au endpoint de login avec des identifiants corrects
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
    }).then((response) => {
      // Vérifier que la réponse contient un code de statut 200
      expect(response.status).to.eq(200);
    });
  });
});
