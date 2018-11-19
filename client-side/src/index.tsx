import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter as Router} from 'react-router-dom';
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Importing Font Awesome icons here
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBriefcase, faHome, faDesktop} from '@fortawesome/free-solid-svg-icons';
library.add(faHome, faBriefcase, faDesktop)

ReactDOM.render(<Router><App /></Router>, document.getElementById("root") as HTMLElement);
registerServiceWorker();


