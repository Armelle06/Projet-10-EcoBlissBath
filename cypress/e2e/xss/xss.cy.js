describe("XSS test de vulnérabilité ", () => {
  it("TEST 1_Devrait pas pouvoir injecté du script malveillant", () => {
    cy.login(); // Utilisateur authentifié
    cy.wait(1000);
    cy.getBySel("nav-link-reviews").click();
    cy.get('[data-cy="review-input-rating-images"] img').first().click();

    // Injection d'un script malveillant dans les champs du formulaire d'avis
    const xssScript = "<script>alert('XSS attack!')</script>";
    cy.getBySel("review-input-title").type(
      "XSS injection de script malveillant "
    );
    cy.getBySel("review-input-comment").type(xssScript);
    // Avis envoyé
    cy.getBySel("review-submit").click();
    // Vérifier la présence de l'avis
    // Vérifier la présence de l'avis
    cy.getBySel("review-comment").should("contain", xssScript);
    cy.wait(2000);
  });
});
