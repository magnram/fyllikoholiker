import React from "react";


const PIText = ({ title, text }) => {

    if(!text || text === ", , ") return null;

    return (
        <div>
            <h6 style={{ marginTop: "13px"}}><b> { title } </b></h6>
            <p>
                { text }
            </p>
        </div>
    );
};


export default PIText; 
