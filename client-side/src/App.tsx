import * as React from "react";
import "./App.css";
import {Header, Footer, SideBar} from "./components/common";
import Routes from "./routes";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";

// Importing Font Awesome icons here
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBriefcase, faEllipsisV, faHome, faDesktop} from '@fortawesome/free-solid-svg-icons';
library.add(faEllipsisV, faHome, faBriefcase, faDesktop)

// Setup Apollo Client
const client = new ApolloClient({
    uri: "http://localhost:4321/graphql"
})

class App extends React.Component {
    public render() {
        return (
            <ApolloProvider client={client}>
                <Header />
                <div className="wrapper">
                    <SideBar />
                    <div id="content">
                        <Routes />
                    </div>
                </div>
                <Footer />
            </ApolloProvider>
        );
    }
}
export default App;
