// test XSS
describe("XSS test de vulnrabilité ", () => {
  it("TEST 1_Devrait pas pouvoir injecté du script malveillant", () => {
    cy.login(); // utilisateur authentifié
    cy.wait(1000);
    cy.getBySel("nav-link-reviews").click();
    cy.get('[data-cy="review-input-rating-images"] img').last().click();

    // Injection d'un script malveillant dans les champs du formulaire d'avis
    const xssScript = "<script>alert('XSS attack!')</script>";
    cy.getBySel("review-input-title").type(
      "XSS injection de script malveillant "
    );
    cy.getBySel("review-input-comment").type(xssScript);

    // Submit the review
    cy.getBySel("review-submit").click();
    // Check that the malicious script is not present in the review content
    cy.getBySel("review-comment").should("not.contain", xssScript);
  });
});
