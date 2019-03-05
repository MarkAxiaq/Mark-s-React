import * as React from "react";
import {withRouter} from 'react-router-dom';
import {setToken, loggedIn} from '../../helpers/auth/authHelperMethods';

export const ExternalEntryPoint = withRouter(({match, ...props }) => {
    const handleTokenAndRedirect = () => {
        // Set passed token in localstorage
        setToken(match.params.token);
        // Check if the token is valid and if it is, redirect to page else go to login
        if(loggedIn()){
            props.history.replace(`/${match.params.page}`);
        } else {
            props.history.replace('/');
        }
    }

    // TODO: Remove this and replace by a fancy Loader
    setTimeout(() => {
        handleTokenAndRedirect();
    }, 2000);

    return (
        <div id="externalEntryPoint" className="container-fluid">
            <div className="row pageMarginTop">
                <div className="col text-center">
                    <h1><small>You have been redirected to our </small> <strong>Back Office</strong></h1>
                    <br/>
                    <p>Opening your Page...</p>
                </div>
            </div>
        </div>
    )
})
