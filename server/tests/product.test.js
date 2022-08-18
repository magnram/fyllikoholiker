const { expect } = require('chai');
const { expectedProduct } = require("./test-data");
const { GET_PRODUCT, GET_WATCHES } = require("./api");


describe('product query', () => {

    // Check that the correct product is returned when queried
    it('returns product when queried', async () => {
        let result = await GET_PRODUCT();
        result = result.data.data.product;
        expect(result).to.eql(expectedProduct);
    });

    // Check that a new watch is added when you query a specific product
    it('adds a watch when queried and last watch has correct product id', async function () {

        this.timeout(10000) // Expanding timout time because these queries tends to take some time
        let watchesBefore = await GET_WATCHES();
        watchesBefore = watchesBefore.data.data.watches.watches;

        let product = await GET_PRODUCT();
        product = product.data.data.product;

        let watchesAfter = await GET_WATCHES();
        watchesAfter = watchesAfter.data.data.watches.watches;


        expect(watchesAfter.length).to.eql(watchesBefore.length + 1); //Length should increase by 1
        expect(watchesAfter[watchesAfter.length-1].product.name).to.eql(product.name); // The id should match
        
    });
});