// A collection of all the queries the client issues to the server
import { gql } from "apollo-boost"; 


export const GET_PRODUCTS = gql`
  query Products($searchWord: String!, $limit: Int, $skip: Int, $filters: FilterInputObject, $sort: String){
        products(search: $searchWord, limit: $limit, skip: $skip, filters: $filters, sort: $sort) {
            products {
                id
                isFavorited
                img
                name
                volume
                type
                country
                price
                alcohol
            }
        totalCount
        }
    }
`;

export const GET_ONE_PRODUCT = gql`
    query Product($id: String!) {
        product(id: $id){
            id
            isFavorited
            date
            name
            volume
            price
            pricePerLiter
            alcohol
            type
            tannins
            fullness
            freshness
            sweetness
            bitterness
            color
            aroma
            taste
            goodWith
            country
            district
            vintage
            method
            sugar
            img
            packaging
            url 
            eco
            bioDynamic
            fairTrade
            green_packaging
            gluten
        }   
    }
`;

export const TOGGLE_FAVORITE = gql`
    mutation toggleFavorite($productId: String!){
        toggleFavorite(productId: $productId){
            id
            product {
                id
                name
            }
            user {
                id
            }
        }
    }
`;

export const GET_WATCHES = gql`
    query {
        watches {
            countries
            types
        }
    }
`;