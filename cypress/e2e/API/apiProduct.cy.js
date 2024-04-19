describe("test Api /products ", () => {
  it("retourne la fiche produit avec son Id ", () => {
    const productId = "5";
    cy.request(`${Cypress.env("apiURL")}/products/${productId}`).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id", parseInt(productId)); //parseInt permet de modier un "5" en nombre
        const productDetails = response.body;
        expect(productDetails.name).to.eq("Poussière de lune");
        expect(productDetails.skin).to.eq("Peau grasse");
        expect(productDetails.aromas).to.eq("Musc");
      }
    );
  });

  const apiProduct = `${Cypress.env("apiURL")}/products`;

  it(" GET liste des produits", () => {
    cy.request("GET", apiProduct).then((reponse) => {
      expect(reponse.status).to.eq(200);
      expect(reponse.body.length).to.be.greaterThan(7); // en changeant au dela de 8 y a erreur
    });
  });
});
