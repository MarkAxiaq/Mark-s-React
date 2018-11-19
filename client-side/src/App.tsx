import * as React from "react";
import "./App.css";
import {Header, Footer, SideBar} from "./components/common";
import Routes from "./routes";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";

// Setup Apollo Client
const client = new ApolloClient({
    uri: "http://localhost:4321/graphql"
})

class App extends React.Component {
    public render() {
        return (
            <ApolloProvider client={client}>
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
