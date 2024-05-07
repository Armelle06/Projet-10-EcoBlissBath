describe("Test API / Produits ", () => {
  const apiProduct = `${Cypress.env("apiUrl")}/products`;

  it(" TEST 1_GET / liste des produits", () => {
    cy.request("GET", apiProduct).then((reponse) => {
      expect(reponse.status).to.eq(200);
      expect(reponse.body.length).to.be.greaterThan(7); // verifie si la longueur est supérieur a 7,en changeant au dela de 8 y a erreur car que 8 articles
    });
  });
  it("TEST 2_GET / liste produits ID  ", () => {
    const productId = "5";
    cy.request("GET", `${apiProduct}/${productId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id", parseInt(productId)); //parseInt permet de modifier un "5" en nombre
      const productDetails = response.body;
      expect(productDetails.name).to.eq("Poussière de lune");
      expect(productDetails.skin).to.eq("Peau grasse");
      expect(productDetails.aromas).to.eq("Musc");
    });
  });
});
