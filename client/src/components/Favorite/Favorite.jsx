import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { TOGGLE_FAVORITE } from "../../queries/queries";
import classes from "./Favorite.module.css";


const Favorite = ({ productId, isFavorited }) => {

    const [favorited, setFavorited] = useState(isFavorited);

    // If the product is favorited, display a filled heart
    let src = favorited ? "icons/favorite-solid.svg" : "icons/favorite-regular.svg";
    
    // Fetches the toggleFavorite mutation from the backend
    const [toggleFavorite] = useMutation(TOGGLE_FAVORITE);

    return (
        <div 
            className={ classes.Favorite }
            favorite-button="fav"            
            onClick={() => { 
                setFavorited(!favorited);
                toggleFavorite({ variables: { productId } });
            }} 
        >
            <img 
                src={ src } 
                alt="Toggle favorite"
            />
        </div>
    );
};


export default Favorite;
