import * as React from "react";
import {Route} from "react-router-dom";
import {About, Home, Websites} from "./components/pages";

const Routes = () =>
    (
        <div>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/websites" component={Websites}/>
        </div>
    );
export default Routes;