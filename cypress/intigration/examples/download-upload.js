/// <reference types="cypress-downloadfile"/>
/// <reference types="cypress" />
describe("Download File", () => {
  it("Download file test", () => {
    cy.downloadFile(
      "http://codenboxautomationlab.com/wp-content/uploads/2023/02/DemoData.csv",
      "MyDownloads",
      "DemoData.csv"
    );
  });
  it("write file ", () => {
    cy.writeFile("sampleFile.txt", "Hello Umair\n");
    cy.writeFile("sampleFile.txt", "How are you", { flag: "a+" });
    cy.writeFile("cypress/fixtures/example.json", {
      name: "Jane",
      email: "jane@example.com",
      password: 123456,
    });
  });
  it("read file", () => {
    cy.readFile("MyDownloads/DemoData.csv")
      .should("exist")
      .and("contains", "Jenni");
    cy.fixture("example").then((profile) => {
      expect(profile.name).to.eq("Jane");
    });
  });
  it("login test", function () {
    cy.visit("https://login.salesforce.com/?locale=ca");
    cy.fixture("example").then((profile) => {
      cy.get("#username").type(profile.email);
      cy.get("#password").type(profile.password);
    });
  });
});
