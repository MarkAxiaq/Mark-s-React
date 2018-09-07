import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as React from "react";
import {Link} from "react-router-dom";
import "./sideBar.css";

const SideBar = () => {
    return (
        <nav id="sidebar" className="active">
            <ul className="list-unstyled components">
                <li className="active">
                    <Link className="nav-link" to="/">
                        <span><FontAwesomeIcon icon="home" /> Home</span>
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/about">
                        <span><FontAwesomeIcon icon="briefcase" /> About</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
export default SideBar;
