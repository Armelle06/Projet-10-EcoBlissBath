describe("Ajouter un avis ", () => {
  let token;

  it("TEST 1_Connexion et récuperation Token ", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("apiUrl") + "/login",
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");

      token = response.body.token;
    });
  });

  it("TEST 2_Ajouter un avis avec validToken ", () => {
    cy.login();
    cy.request({
      method: "POST",
      url: Cypress.env("apiUrl") + "/reviews",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        title: "Test ajout d'avis avec Token ",
        comment: "Test commentaire avec Token",
        rating: "5",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // Ajout d'avis sans etre authentifié peux apporter des faux avis / diffamatoires// test exploratoire!!
  it("TEST 3_Ajouter un avis sans authentification", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("apiUrl") + "/reviews",
      body: {
        title: "Test  ajout d'avis sans authentification",
        comment: "Test commentaire sans authentification",
        rating: "0",
      },
      failOnStatusCode: false, // Permet à la requête de réussir même si elle renvoie un code d'erreur
    }).then((response) => {
      // Vérifie que la requête a renvoyé un code d'erreur 401 (non autorisé)
      expect(response.status).to.eq(401);
    });
  });
});
