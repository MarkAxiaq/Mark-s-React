import * as React from "react";
import "./App.css";
import Footer from "./components/common/footer/footer";
import Header from "./components/common/header/header";
import SideBar from "./components/common/sideBar/sideBar";
import Routes from "./routes";

// Importing Font Awesome icons here
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBriefcase, faEllipsisV, faHome } from '@fortawesome/free-solid-svg-icons';
library.add(faEllipsisV, faHome, faBriefcase)

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <Header />
                <div className="wrapper">
                    <SideBar />
                    <div id="content">
                        <Routes />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
export default App;
