import * as React from "react";
import {withRouter} from 'react-router-dom';
import AuthHelperMethods from '../../helpers/auth/authHelperMethods';

export const ExternalEntryPoint = withRouter(({match, ...props }) => {

    const Auth = new AuthHelperMethods();

    const handleTokenAndRedirect = () => {
        // Set passed token in localstorage
        Auth.setToken(match.params.token);
        // Check if the token is valid and if it is redirect to page
        if(Auth.loggedIn()){
            props.history.replace(`/${match.params.page}`);
        }
    }

    // We can remove this or do a fancy kwiff loader like the apple app :)
    setTimeout(() => {
        handleTokenAndRedirect();
    }, 2000);

    return (
        <div id="externalEntryPoint" className="container-fluid">
            <div className="row pageMarginTop">
                <div className="col text-center">
                    <h1><small>You have been redirected to our new</small> <strong>Back Office</strong></h1>
                    <br/>
                    <p>Opening your Page...</p>
                </div>
            </div>
        </div>
    )
})
