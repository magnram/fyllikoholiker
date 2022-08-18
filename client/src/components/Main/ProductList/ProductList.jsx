import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks"; 
import { connect } from "react-redux"; 
import InfiniteScroll from "react-infinite-scroller";
import classes from "./ProductList.module.css";
import ProductCard from "./ProductCard/ProductCard";
import { GET_PRODUCTS } from "../../../queries/queries";
import fromEntries from "fromentries";

const ProductList = ({ searchWord, filters, sort, isFavorited }) => {

    // Gets all the filters from the redux state, removes all nulls
    filters = fromEntries(Object.entries(filters).filter(([key, value]) => ( value !== null )));

    if(isFavorited) filters.isFavorited = true;


    // Queries products from the database, 12 elements at a time
    const { loading, error, data, refetch, fetchMore } = useQuery(GET_PRODUCTS, {variables: { searchWord, filters, sort, limit: 12, skip: 0 }}); 

    // Makes sure the component is rerendered when isFavorited changes. This fixes the transition from Main to Overview
    useEffect(() => {
        refetch(isFavorited);
    }, [isFavorited, refetch]);

    const loader = (
        <div className="spinner-grow text-warning ml-3" role="status">
        <span className="sr-only">Laster...</span>
        </div>
    )

    if (loading) return loader;

    if (error) return <p>Error.....</p>;

    const { products, totalCount } = data.products;

    // Fetches next page 
    const onLoadMore = () => (

        // Method included in apollo, queries the next products and appends the list of products to the already saved ones
        fetchMore({
        variables: {
            skip: products.length
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return previousResult;
            return {
            products: {
                products: [ ...previousResult.products.products, ...fetchMoreResult.products.products],
                totalCount: previousResult.products.totalCount,
                __typename: "ProductsResult"
            }
            };
        }
        })
    );


    // Checks if there are more pages, this is used by the InfiniteScroll-component
    const isMorePages = totalCount-products.length !== 0;

    return (

        <InfiniteScroll
            pageStart={0}
            loadMore={ onLoadMore }
            hasMore={ isMorePages }
            loader={ loader }
        >

            <i> Viser { totalCount } resultater </i>

            <div className={ classes.CardGroup }>

                { products.map(({ id, isFavorited, img, name, volume, type, country, price, alcohol })  => (
                <ProductCard
                    id = { id }
                    key={ id }
                    isFavorited = { isFavorited }
                    img={ img }
                    name={ name }
                    volume={ volume }
                    type={ type } 
                    country={ country }
                    price={ price }
                    alcohol={ alcohol }
                />
                ))}

            </div>

        </InfiniteScroll>
    );
};


const mapStateToProps = ({ searchWord, filters, sort }) => ({
    searchWord,
    filters, 
    sort
});

export default connect(mapStateToProps, null)(ProductList);
