import React from "react";


const PIList = ({ list }) => {

    if(!list || list.length === 0) return null;

    return (
        <div>
        <ul className="list-group list-group-flush">
            {list.map((el,index) => <li key={index} className="list-group-item"> {el} </li>)}
        </ul>
    </div>
    );
};


export default PIList; 
