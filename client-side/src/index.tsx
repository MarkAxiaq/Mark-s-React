import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter as Router} from 'react-router-dom';
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";


// Bootstrap
import 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js';

ReactDOM.render(
    <Router><App /></Router>, document.getElementById("root") as HTMLElement);
registerServiceWorker();


