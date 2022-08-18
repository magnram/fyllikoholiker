import React from "react";
import { connect } from "react-redux";

import { resetAll } from "../../store/actions"; 
import SearchBar from "./SearchBar/SearchBar";
import { NavLink } from "react-router-dom";

const NavBar = ({ resetAll }) => (
    <nav className="navbar fixed-top navbar-expand-lg bg-white navbar-light border-bottom border-secondary">

        <NavLink className="navbar-brand" exact to="/" onClick={ resetAll }>

            <img src="polet-logo.png" width="30" height="30" className="d-inline-block align-top" alt="logo" />
            <span className="d-none d-sm-inline"> Fyllikoholiker </span>
            
        </NavLink>

        <SearchBar />

        {/* When the link is activated, it becomes disabled */}
        <NavLink activeStyle={{color: "#DDD", pointerEvents: "none"}} onClick={ resetAll } data-cy="Oversikt" to="/overview" className="gl-text-polet-hover"> Min side </NavLink>

    </nav>
);


export default connect(null, { resetAll })(NavBar);
