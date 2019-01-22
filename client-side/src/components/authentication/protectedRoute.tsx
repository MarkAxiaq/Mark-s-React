import * as React from "react";
import {Route, Redirect} from "react-router-dom";
import AuthHelperMethods from '../../helpers/auth/authHelperMethods';

export const ProtectedRoute = ({component: Component, ...rest}) => {

    const Auth = new AuthHelperMethods();

    return (
        <Route
            {...rest}
            render={props => {

                if(Auth.loggedIn()) {
                    return <Component {...props}/>;
                } else {
                    return <Redirect to={
                        {
                            pathname: "/",
                            state:{
                                from: props.location
                            }
                        }
                    } />
                }
            }}
        />
    )
}
