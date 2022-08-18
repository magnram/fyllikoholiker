import React from "react";
import { HashRouter, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import Overview from "./components/Overview/Overview";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";


const App = () => (
    <HashRouter>
      <NavBar/>
      <Route exact path="/" component={ Main } />
      <Route path="/product/:id" component={ ProductInfo } />
      <Route path="/overview" component={ Overview } />
      
      {/* Makes sure you're scrolled to top when you click go to a new page */}
      <ScrollToTop/>
    </HashRouter>
);


export default App;