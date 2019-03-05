import * as React from "react";
import {Route, Redirect} from "react-router-dom";
import {loggedIn} from '../../helpers/auth/authHelperMethods';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {

                if(loggedIn()) {
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
