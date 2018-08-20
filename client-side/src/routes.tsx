import * as React from "react";
import {Route} from "react-router-dom";
import About from "./components/about/about";
import Home from "./components/home/home";

const Routes = () =>
    (
        <div>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/about" component={About}/>
        </div>
    );
export default Routes;