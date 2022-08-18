const axios = require('axios');
const API_URL = 'http://localhost:4000/';

module.exports.GET_PRODUCTS = ({ skip, limit }) =>
    axios.post(API_URL, {
        query: `
        query {
            products(skip: ${ skip ? skip : 0 }, limit: ${ limit ? limit : 100000 }) {
                products {
                    name
                    price
                }
                totalCount
            }
        }
        `
    });

module.exports.GET_PRODUCT = () =>
    axios.post(API_URL, {
        query: `
            query {
                product(id: "5db33ac9eeb0194ab4a0d79f") {
                    name
                    price
                }
            }
        `
    });

module.exports.GET_WATCHES = () =>
    axios.post(API_URL, {
        query: `
            query {
                watches {
                    watches {
                        product {
                            name
                        }
                    }
                }
            }
        `
    });