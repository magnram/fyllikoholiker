import React, { useState } from "react";

import CheckBoxFilter from "./CheckboxFilter/CheckboxFilter";
import SliderFilter from "./SliderFilter/SliderFilter";


const Filter = ({ name, filterKey, type, options }) => {

    const [show, setShow] = useState(false);


    const showClass = show ? "show" : null;

    let filter = null;

    // Depending on the incoming props, the filter is either CheckBoxFilter or SliderFilter
    if(type === "checkbox") {
        filter = <CheckBoxFilter filterKey={ filterKey } options={ options }/>
    } else if (type === "slider") {
        filter = <SliderFilter filterKey={ filterKey } options={ options }/>
    }


    return (
        <>
            {/* When you click on a filter-header, it will toggle open and toggle collapsed */}
            <div className="card-footer gl-bg-polet-light-hover" data-cy={ name } onClick={() => setShow(!show)}>
                { name } 
                <div className="float-right text-polet"> 
                    { show ? "▲" : "▼" }
                </div>
            </div>

            <div className={"card-body collapse enzyme-test " + showClass }>
                { filter }
            </div>
        </>
    );
};


export default Filter;
