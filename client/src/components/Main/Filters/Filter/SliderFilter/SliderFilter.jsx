import React, { useState, useEffect } from "react";
import { connect } from "react-redux"; 
// import { Range } from "rc-slider";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

import { addFilter } from "../../../../../store/actions"; 
import "./SliderFilter.css";

const SliderFilter = ({ filterKey, options, addFilter, filters }) => {
    
    const { min, max, measurementType } = options;
    const selected = filters[filterKey];

    // Local state is changed whenever the slider is moved, while redux state is changed whenever you release it.
    const [value, setValue] = useState({min, max});

    const valueHandler = (value) => {
        if(value.min >= min && value.max <= max) setValue(value)
    }

    // If the selected redux-store-filter has changed and it now is null, reset the local state
    useEffect(() => {

        if(selected === null) setValue({min, max});
        
    }, [selected, min, max]);


    return (
        <div className="m-2">
            <InputRange
                minValue={ min }
                maxValue={ max }
                value={ value }
                formatLabel={value => `${value} ${measurementType}`}
                onChange={ valueHandler }
                onChangeComplete={ () => addFilter({ [filterKey]: [value.min, value.max] }) }
            />
        </div>
    );
};


const mapStateToProps = ({ filters }) => ({
    filters,
});

export default connect(mapStateToProps, { addFilter })(SliderFilter);