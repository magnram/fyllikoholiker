import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import Favorite from '../Favorite/Favorite';

import { GET_ONE_PRODUCT } from '../../queries/queries';
import classes from "./ProductInfo.module.css";
import { currencyFormatNO, numberFormatNO } from '../../utils/utils';
import PIHeader from "./PIHeader";
import PIList from "./PIList";
import PIText from "./PIText";


const Product = () => {

    //Fetches the id from the url
    const { id } = useParams();

    //Queries the product with the correct id
    const { loading, error, data } = useQuery(GET_ONE_PRODUCT, {variables: { id } });
    

    if (loading) return (
        <div className="spinner-grow text-warning" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );
    
    if (error) return <p>Error.......</p>;

    const { product }  = data;



    // Formatting all the data we want presented as lists
    const alcosizeliter = [
        <><b> Alkohol: </b> { numberFormatNO(product.alcohol) }% </>,
        <><b> Størrelse: </b> { numberFormatNO(product.volume/100) } liter </>,
        <><b> Literpris: </b> { currencyFormatNO(product.pricePerLiter) } kr/liter </>,
    ].filter(a => a.props.children[2] !== "0" && a.props.children[2] !== "0,00");
    // Filtering out the 0-values by checking them from the JSX-children

    const freshfullsweet = [
        <><b> Friskhet: </b> { product.freshness } av 12</>, 
        <><b> Fylde: </b> { product.fullness } av 12</>, 
        <><b> Sødme: </b> { product.sweetness } av 12</>
    ].filter(a => a.props.children[2] !== 0);

    const countrydistrictvintage = [
        <><b> Land: </b> { product.country }</>, 
        <><b> Distrikt: </b> { product.district }</>, 
        <><b> Årgang: </b> { product.vintage }</>
    ].filter(a => a.props.children[2] !== "");


    // These are always defined in the databas, so no filtering
    const booleans = [
        <><b> Kosher: </b> { product.kosher ? "✓" : "✗" }</>, 
        <><b> Økologisk: </b> { product.eco ? "✓" : "✗" }</>, 
        <><b> Grønn forpakning: </b> { product.green_packaging ? "✓" : "✗" }</>, 
        <><b> Glutenfri: </b> { product.gluten ? "✓" : "✗" }</>, 
        <><b> Fair Trade: </b> { product.fairTrade ? "✓" : "✗" }</>, 
    ];



    return (
        <div className="gl-main-container">
            <img className={ classes.Img } src={ product.img } alt="" />
            <h1> {product.name } </h1>
            { product.taste ? <i> {product.taste} </i> : null  }
            <Favorite productId={ product.id } isFavorited={ product.isFavorited } />

            <hr/>

            <div className={ classes.InfoContainer }>
                <PIHeader text={ currencyFormatNO(product.price) + " kr" } />
                <PIText title="Produkttype" text={ product.type }/>

                <PIList list={ alcosizeliter }/>
                <PIList list={ freshfullsweet }/>
                <PIList list={ countrydistrictvintage }/>

                <PIText title="Smak og aroma" text={ product.aroma }/>
                <PIText title="Passer til" text={ product.goodWith.join(", ") } />
                <PIText title="Lagringsgrad" text={ product.method } />
                <PIText title="Farge" text={ product.color }/>

                <PIList list={ booleans }/>
                <PIList list={ countrydistrictvintage }/>

                <div>
                    <h6>
                        Link til Vinmonopolet
                    </h6>
                    <a href={ product.url }> 
                        { product.url } 
                    </a>
                </div>
            </div>

        </div>
    );
};

export default Product; 
