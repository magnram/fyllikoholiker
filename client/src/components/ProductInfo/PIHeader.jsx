import React from "react";


const PIHeader = ({ text, subtext }) => {

    if(!text && !subtext) return null;

    return (
        <div>
            <h1> 
                { text } 
            </h1>
            <h6> 
                { subtext }
            </h6>
        </div>
    );
};


export default PIHeader; 
