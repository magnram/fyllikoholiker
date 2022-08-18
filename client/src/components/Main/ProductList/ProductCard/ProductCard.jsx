import React from "react";
import { NavLink } from "react-router-dom";

import Favorite from '../../../../components/Favorite/Favorite.jsx';
import classes from "./ProductCard.module.css";
import { currencyFormatNO, numberFormatNO } from '../../../../utils/utils';


const ProductCard = ({ id, isFavorited, img, name, volume, type, country, price, alcohol }) => (
    <div data-cy="unique-product">
        <div style={{ position: "absolute", zIndex: "1000" }}>
            <Favorite productId={ id } isFavorited={ isFavorited } />
        </div>
        
        <div className="card">

            <div className="gl-text-align-center mx-auto">
                <img className={ ["card-img-top", classes.CardImage].join(" ") } src={ img } alt="preview of product"/>
            </div>

            <div className="card-body"  data-cy="unique-card">

                {/* stretched-link from bootstrap makes the link cover the card */}
                <NavLink to={"product/" + id} className="gl-text-polet-hover stretched-link" >
                <h5 className="card-title" card-title={ name }> { name } </h5>
                </NavLink>
                <h6 className="card-text text-muted"> { type }{ country ? ", " + country : null } </h6>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item"> <b>Pris:</b> { currencyFormatNO(price) } kr </li>
                    <li className="list-group-item"> <b>Prosent:</b> { numberFormatNO(alcohol) } % </li>
                    <li className="list-group-item"> <b>Størrelse:</b> { numberFormatNO(volume/100) } liter  </li>
                </ul>
            </div>

        </div>
    </div>
);


export default ProductCard;
