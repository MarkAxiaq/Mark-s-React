import * as React from "react";
import {Route, Switch} from "react-router-dom";

// Authentication Components
import {ProtectedRoute} from './components/authentication/protectedRoute';
import {ExternalEntryPoint} from './components/authentication/externalEntryPoint';

// Components
import {About, Home, Websites, PageNotFound, Login, } from "./components/pages";

const Routes = () =>
    (
        <Switch>
            <Route path="/" exact={true} component={Login}/>
            <Route path="/externalEntryPoint/:page/:token" exact={true} component={ExternalEntryPoint}/>
            <ProtectedRoute path="/home" exact={true} component={Home}/>
            <ProtectedRoute path="/about" component={About}/>
            <ProtectedRoute path="/websites" component={Websites}/>
            <Route path="*" component={PageNotFound}/>
        </Switch>
    );
export default Routes;