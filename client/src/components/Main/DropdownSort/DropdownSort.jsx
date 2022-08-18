import React from "react"; 
import { connect } from "react-redux"; 

import { addSort } from "../../../store/actions"; 


const DropdownSort = ({ addSort }) => (
    <select className="form-control col-4" onChange={(e) => addSort(e.target.value)}>
        <option value="-favorites"> Mest favoriserte </option>
        <option value="-watches"> Mest sette </option>
        <option value="price"> Pris (laveste først) </option>
        <option value="-price"> Pris (høyeste først) </option>
        <option value="-alcohol"> Alkohol (høyeste først) </option>
        <option value="alcohol"> Alkohol (laveste først) </option>
        <option value="-pricePerLiter"> Literpris (høyeste først) </option>
        <option value="pricePerLiter"> Literpris (laveste først) </option>
        <option value="-volume"> Volum (høyeste først) </option>
        <option value="volume"> Volum (laveste først) </option>
    </select>
);

// When the select changes, the value from the selected options gets added to the redux state
export default connect(null, { addSort })(DropdownSort);