import * as React from "react";
import "./App.css";
import {Header, Footer, SideBar} from "./components/common";
import Routes from "./routes";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";

// Credentials option will allow us to send back the https only cookie session stored from the server back with every request
// This will be validated on the server against the secret key and expiration period
const httpLink = createHttpLink({
    uri: "http://localhost:4321/graphql",
    credentials:'include'
});

// After every request we are verifying the response
const afterwareLink = new ApolloLink((operation, forward: any) => {
    return forward(operation).map(response => {
        if (response) {
            const context = operation.getContext();
            const { response: { headers } } = context;

            if (headers) {
                // Extracting auth from the headers that was set on the backend
                const auth = headers.get("auth");

                // If exist we store it so we can access it later
                // auth includes authentication and authorisation data
                // auth data is being determined weather the user is logged in or not
                // This is being taken care of on the backend by the help of sessions
                if (auth) {
                    // Todo: Store this in Redux Store
                    localStorage.setItem("auth", auth);
                }
            }
        }
        return response;
    });
});

const httpLinkWithAfterWareLink = afterwareLink.concat(httpLink);

const apolloClient = new ApolloClient({
    link: httpLinkWithAfterWareLink,
    cache: new InMemoryCache()
});

class App extends React.Component {
    public render() {
        return (
            <ApolloProvider client={apolloClient}>
                <Header />
                <div className="container-fluid footerHeight">
                    <div className="row">
                        <div id="sideBar" className="col-1">
                            <SideBar />
                        </div>
                        <div id="content" className="col-11">
                            <Routes />
                        </div>
                    </div>
                </div>
                <Footer />
            </ApolloProvider>
        );
    }
}
export default App;
