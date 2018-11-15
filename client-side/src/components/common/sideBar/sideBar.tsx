import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as React from "react";
import {Link} from "react-router-dom";

import "./sideBar.css";

export default () =>
    <nav id="sidebar" className="active">
        <ul className="list-unstyled components">
            <li className="active">
                <Link className="nav-link" to="/">
                    <span><FontAwesomeIcon icon="home" /><br/>Home</span>
                </Link>
            </li>
            <li>
                <Link className="nav-link" to="/about">
                    <span><FontAwesomeIcon icon="briefcase" /><br/>About</span>
                </Link>
            </li>
            <li>
                <Link className="nav-link" to="/websites">
                    <span><FontAwesomeIcon icon="desktop" /><br/>Websites</span>
                </Link>
            </li>
        </ul>
    </nav>