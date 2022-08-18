import React from "react";

import classes from "./Checkbox.module.css";


const Checkbox = ({ alt, selected, toggleChecked }) => ( 
    <div>

        {/* When selected, call toggleChecked(). To see if a checkbox should be checked, see if it is in the "selected"-list */}
        <input className={ classes.Checkbox } type="checkbox" onChange={ toggleChecked } checked={ selected.indexOf(alt) !== -1 } value={ alt } id={ alt } />

        <label data-cy={ alt } className={ classes.Label } htmlFor={ alt }> { alt } </label>

    </div>
);

export default Checkbox;