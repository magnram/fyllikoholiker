import React from "react";
import { connect } from "react-redux"; 

import { addFilter } from "../../../../../store/actions"; 
import Checkbox from "./Checkbox/Checkbox";


const CheckboxFilter = ({ filterKey, options, addFilter, filters }) => {
    
    // Fetches the current filter from all the filters
    const selected = filters[filterKey] || [];

    const { alternatives } = options;

    // Adds the checked element to the list if it's not already there. Removes if unchecked
    const toggleChecked = (e) => {
        const { value, checked } = e.target;


        let temp = selected ? selected.filter(a => a !== value) : [];
        if (checked) temp.push(value);

        // If array is empty, change it to null
        temp = temp.length === 0 ? null : temp;

        addFilter({ [filterKey]: temp });
    }


    return( 
        <>
            { alternatives.map(alt => (
                <Checkbox
                    key={ alt }
                    alt={ alt }
                    selected={ selected }
                    toggleChecked={ toggleChecked }
                />
            )) }
        </>
    );
};


const mapStateToProps = ({ filters }) => ({
    filters
});

export default connect(mapStateToProps, { addFilter })(CheckboxFilter);