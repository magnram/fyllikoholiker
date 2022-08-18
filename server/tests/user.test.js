const { expect } = require('chai');
const { GET_PRODUCTS } = require("./api");


describe('user', () => {

    it('recieves a token on queries', async () => {
        let result = await GET_PRODUCTS({})
        expect(result.headers["set-cookie"].length).to.be.at.least(1);
    });

});