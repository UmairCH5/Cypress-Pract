/// <reference types="cypress" />

describe("Ecommerce Smoke Suite", () => {
  before(function () {
    // Clear cookies and local storage before the 1st test
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("e-2-e smoke test", () => {
    Cypress.config("defaultCommandTimeout", 8000);
    //cy.visit('https://demo.codenbox.com/')
    cy.visit("/");
    cy.url().should("include", "demo");

    const productName = "MacBook";
    //find all the 4 products
    cy.get(".col.mb-3").should("have.length", 4);

    // Filter the product list to find the MacBook product

    cy.get(".col.mb-3")
      .filter(':contains("' + productName + '")')
      .then(($product) => {
        // Check if the product name is present
        expect($product.text()).to.include(productName);
        // Click on the product name
        cy.contains(productName).click();
      });

    // Validate the product name is MacBook
    cy.get('div[class="col-sm"] h1')
      .should("be.visible")
      .and("have.text", productName);

    // Validate the price is $602.00
    cy.get(".price-new").should("be.visible").and("have.text", "$602.00");

    // Validate the product description
    cy.get(".nav-link.active").should("have.text", "Description");
    cy.get('div[id="tab-description"] p:nth-child(1)')
      .invoke("text")
      .then((des) => {
        des = des.trim();
        expect(des).to.eq("Intel Core 2 Duo processor");
      });

    cy.get("#content > .nav > :nth-child(3) > .nav-link").click();

    cy.get("#input-author").type("Umair");
    cy.get("#input-text").type(
      "Fixtures are a great way to mock data for responses to routes"
    );

    cy.get('[value="5"]').click();
    cy.get("#button-review").click(); //submit review

    cy.get(".alert", { timeout: 5000 })
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal(
          "Thank you for your review. It has been submitted to the webmaster for approval."
        );
      });

    cy.get("#button-cart").click();
    cy.get(".alert.alert-success.alert-dismissible")
      .should("be.visible")
      .and("contain", "Success");

    cy.wait(2000);
    cy.get(".dropdown.d-grid").click();
    cy.get(".dropdown-menu.dropdown-menu-end.p-2.show")
      .as("displayItem")
      .should("be.visible")
      .and("contain", "x 1", "602.00")

      .and("contain", " View Cart")
      .and("contain", "Checkout");

    cy.get("@displayItem").contains("a", "Checkout").click();

    cy.get('form[id="form-register"] p a strong').click();
    cy.login();

    let sum = 0;
    cy.get(
      'table[class="table table-bordered table-hover"] tfoot tr td:nth-child(2)'
    )
      .each(($el, index, $list) => {
        if (index < $list.length - 1) {
          const price = $el.text(); //"$500.00"  $1,020.00  // 500 -> 500.00
          // remove $ sign or ,string need to convert to number: regex /[^0-9.-]+/g
          const amount = parseFloat(price.replace(/[^0-9.-]+/g, "")); //100
          sum = sum + amount; //5002.00 +100.00
          cy.log("sum of amount is" + sum);
        }
      })
      .then(() => {
        cy.get("tfoot > :nth-child(4) > :nth-child(2)")
          .invoke("text")
          .then((total) => {
            const totalAmount = parseFloat(total.replace(/[^0-9.-]+/g, "")); //602.00
            expect(totalAmount).to.equal(sum); //602.00
          });
      });
    cy.get(".dropdown > .btn-lg").click();
    cy.get(":nth-child(1) > :nth-child(5) > form > .btn").click();
    //       cy.request({
    //   method: 'POST',
    //   url: 'https://demo.codenbox.com/index.php?route=common/cart.remove&language=en-gb',
    //   form: true,
    //   body: {
    //     key: '496'
    //   }
    // }).then((res) => {
    //   expect(res.status).to.eq(200)
    // });
    cy.get(".alert")
      .should("be.visible")
      .and(
        "contain",
        "Success: You have removed an item from your shopping cart!"
      );
  });
});
