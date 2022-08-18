import React from "react";

import Filter from "./Filter/Filter";
import filters from "./filterList";

// Loads filters from the filterList-file and translates to JSX
const Filters = () => (

    <div className="card">
        <div className="card-header gl-bg-polet">
            Filter results 
        </div>

        { filters.map((filter, index) => (
            <Filter 
            key={ index }
            name={ filter.name }
            filterKey={ filter.filterKey }
            type={ filter.type } 
            options={ filter.options }
            />
        ))}

    </div>
);


export default Filters;
