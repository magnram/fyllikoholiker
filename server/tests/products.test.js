const { expect } = require('chai');
const { expectedProducts } = require("./test-data");
const { GET_PRODUCTS } = require("./api");


describe('products query', () => {

    // Checks that all products are correctly returned when queried
    it('returns all products', async () => {
        let result = await GET_PRODUCTS({})
        result = result.data.data.products;
        expect(result.products).to.eql(expectedProducts);
        expect(result.totalCount).to.eql(100);
    });

    // Checks that skip works as intended
    it('returns 9 products after 1 skip', async () => {
        let result = await GET_PRODUCTS({skip: 1})
        result = result.data.data.products;
        expect(result.products).to.eql(expectedProducts.filter((a,index) => index !== 0 ));
        expect(result.totalCount).to.eql(100);
    });

    // Checks that limit works as intended
    it('returns 5 first products after limit 5', async () => {
        let result = await GET_PRODUCTS({limit: 5})
        result = result.data.data.products;
        expect(result.products).to.eql(expectedProducts.filter((a,index) => index < 5 ));
    });

    // Here we could have added tests for the other parameters, such as "filters", "search" and "sort", but this was not prioritized as it would be quite repetitive with low amount of learning
});