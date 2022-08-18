import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { addSearchWord, resetFilter } from "../../../store/actions"; 


const SearchBar = ({ resetFilter, addSearchWord, history, sWord }) => {

    // A local state keeps track of the value in the input field
    const [searchWord, setSearchWord] = useState("");

    // If the global searchword is empty, reset the local one too when it renders
    useEffect(() => {
        if(sWord === "") setSearchWord("");
    },[sWord]);

    const onSearch = () => {

        // If you search, the filters should be reset
        resetFilter();

        // Updates the redux state to match the local searchWord
        addSearchWord(searchWord);

        // Redirects you to the front-page
        history.push("/");
    };

    // If you press enter, it will also search
    const onEnterPress = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSearch();
        };
    };

    return (
        <form className="form-inline mx-auto">
            <div className="form-group my-auto">
                <input 
                    onChange={event => setSearchWord(event.target.value)}
                    onKeyPress={ onEnterPress }
                    className="form-control mr-sm-2"
                    value={ searchWord}
                    type="search" 
                    placeholder={ "Søk på produkt"}
                    aria-label="Søk på produkt">
                </input>
                <div>
                    <button className="btn gl-btn-outline-polet d-none d-sm-block ml-2 my-2 my-sm-0" type="button" onClick={ onSearch }>Søk</button>
                </div>
            </div>
        </form>
    );
};


// Getting the global searchWord and giving it the name sWord to not create naming conflicts
const mapStateToProps = ({ searchWord }) => ({
    sWord: searchWord,
});

// Imports the reducer-methods to addSearchWord and to resetFilter.

// withRouter adds the possibility to redirect to the main page while still keeping the state
export default connect(mapStateToProps, { addSearchWord, resetFilter })(withRouter(SearchBar));
