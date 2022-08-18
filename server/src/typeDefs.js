const { gql } = require('apollo-server-express');

const typeDefs = gql`

    # Defines the possible queries you can make, with parameters and what it returns
    type Query {
        products(skip: Int, limit: Int, search: String, filters: FilterInputObject, sort: String): ProductsResult
        product(id: String!): Product
        watches: WatchesResult
    }

    # Defines the possible mutations
    type Mutation {
        toggleFavorite(productId: String!): Favorite

    }

    # Everything you can filter on
    input FilterInputObject {
        # Checkbox-types
        filterType: [String!]
        filterCountry: [String!]
        vintage: [String!]
        packaging: [String!]
        eco: Boolean
        kosher: Boolean
        bioDynamic: Boolean
        green_packaging: Boolean
        gluten: Boolean
        isFavorited: Boolean

        # Number-types
        volume: [Float!]
        price: [Float!]
        pricePerLiter: [Float!]
        alcohol: [Float!]
        tannins: [Float!]
        fullness: [Float!]
        freshness: [Float!]
        sweetness: [Float!]
        bitterness: [Float!]

    }

    # Defines what fields you can query on product, same fields as in database
    type Product {
        id: String!
        date: String
        name: String
        volume: Float
        price: Float
        pricePerLiter: Float
        alcohol: Float
        type: String
        filterType: String
        tannins: Float
        fullness: Float
        freshness: Float
        sweetness: Float
        bitterness: Float
        color: String
        aroma: String
        taste: String
        goodWith: [String]
        country: String
        filterCountry: String
        district: String
        vintage: String
        method: String
        sugar: String
        img: String
        packaging: String
        url: String
        eco: Boolean
        bioDynamic: Boolean
        kosher: Boolean
        fairTrade: Boolean
        green_packaging: Boolean
        gluten: Boolean
        isFavorited: Boolean
        favorites: [Favorite!]
        watches: [Watch!]
    }

    enum FilterTypes {
        CHECKBOX
        NUMBER
    }

    type Filter {
        name: String!
        type: FilterTypes!

        # If checkbox-type
        alternatives: [String]

        # If number-type
        min: Float
        max: Float
        step: Float
    }

    type ProductsResult {
        products: [Product]
        totalCount: Int
        filters: [Filter]
    }

    type User {
        id: String!
        favorites: [Favorite!]
        watches: [Watch!]
    }

    type Favorite {
        id: String!
        product: Product!
        user: User!
    }

    type Watch {
        id: String!
        product: Product!
        user: User!
        date: String!
    }

    type WatchesResult {
        watches: [Watch!]
        countries: [[String!]!]
        types: [[String!]!]
    }
`;

module.exports = typeDefs;