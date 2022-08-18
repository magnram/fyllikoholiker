import { assertAbstractType } from "graphql";

describe("My first test", function() {
    it("Vitists our homepage", function() {
        cy.visit("http://localhost:3000")
    })
})

describe("Homepage testing", function() {
    it("Checks if filter by type is working", function(){
        cy.visit("http://localhost:3000")
        cy.contains("Type").click()
        cy.contains("Akevitt").click()
        cy.contains("Akevitt")
        cy.contains("Norge")
    })
})

describe("Homepage testing", function() {
    it("Checks if homepage kan filter (filtering on akevitt button)", function() {
        cy.visit("http://localhost:3000")

        const type_button = cy.get("[data-cy=Type]")
        type_button.click()

        const akevitt_button = cy.contains("Likør")
        akevitt_button.click()

        cy.wait(1500)
        cy.get("[data-cy=Likør]").should("be.visible");
        cy.get("[data-cy=Vin]").should("not.be.visible");


    })
})

describe("searchProducts", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");

        cy.get("input.form-control.mr-sm-2")
            .type("Jägerm{enter}")

    })
    it("contains Polet in the title", () => {
        cy.title().should("contain", "Polet");
        cy.wait(1500);

        // Gets first card from search results and checks that its the right product
        cy.get("[data-cy='unique-card']").eq(0).as("firstJager")
        cy.get("@firstJager").within(() => {
            
            cy.get("[card-title]").invoke("attr","card-title").should("equal", "Jägermeister").as("jagerCard")
        })
        
        // Verifies that the product actually is visible on the page
        cy.get("@firstJager").should("be.visible");

        cy.get("[data-cy='Fireball']").should("not.be.visible");
        cy.get("div.spinner-grow.text-warning-ml-3").should("not.be.visible");

    })
})

describe('Load more items', () => {
    it('Scrolls to bottom of page, and download more products', () => {

    
        cy.visit('http://localhost:3000/');

        // checks if at the right page
        cy.title().should('contain', 'Polet');

        //checks that the right amount of products is loaded at page-refresh

        cy.get('[data-cy="unique-card"]').should('have.length', 12);

        // Manually scrolls to bottom of page, and loads 24 more items
        cy.window().scrollTo('bottom');

        // waiting for data to load
        cy.wait(1500);

        // checking that website is loading the correct amount of products (24 more products each time we scroll to the bottom)
        cy.get('[data-cy="unique-card"]').should('have.length', 24);
    });
});


describe("Add prodcuts to favorites", () => {
    it("Adds product to favorites and checks if product is present in the favorite section on the website", () => {
        
        cy.visit("http://localhost:3000/"); 

        // Searches on a product
        cy.get("input.form-control.mr-sm-2")
             .type("Martini Bianco{enter}")

        // Getting the first element with an favorite button and gives it an alias 
        const fav_element = cy.get("[data-cy='unique-product']").eq(0).as("firstCard"); 

        // Gets the name of the first product on the page
        const product_name = cy.get("@firstCard").within( () => {
            cy.get("[card-title]").invoke("attr", "card-title").as("product_name");
        });

        // Finds the favorite button of the first product and clicks on it
        const fav_button = cy.get("@firstCard").within( () => {
            cy.get("[favorite-button]");
        }); 
        fav_button.click(); 
        
        // Clicks on the oversikt button in the right corner
        const oversikt_button = cy.get("[data-cy='Oversikt']");
        oversikt_button.click();

        // Gets the first product in the favorite section
        cy.get("[data-cy='unique-product']").eq(0).as("firstFav")
        
        // Gets the name of the first favorited product
        const fav_name = cy.get("@firstFav").within(() => {
            cy.get("[card-title]").invoke("attr", "card-title");
        });
        
        // Checks if the name equals our expected value
        fav_name.should("equal", "Martini Bianco")
       
        
    });
})