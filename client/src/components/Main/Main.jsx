import React from "react";

import Filters from "./Filters/Filters.jsx"; 
import ProductList from "./ProductList/ProductList"; 
import DropdownSort from "./DropdownSort/DropdownSort"; 
import classes from "./Main.module.css";

const Main = () => (

    <div className={ classes.Main }>

        <div className={"container-fluid " + classes.Controls }>
            <div className="row">
                <div className="col-8 w-50" >
                    <h3 className={ classes.SearchResults }> Søkeresultater </h3>
                </div>
                <DropdownSort/>
            </div>
        </div>

        <div className={ classes.Filters }>
            <Filters/>
        </div>

        <div className={ classes.ProductList }>
            <ProductList/>
        </div>

    </div>
);

export default Main;
