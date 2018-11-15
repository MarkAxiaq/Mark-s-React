import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as React from "react";
// import logo from "../../../assets/images/logo.svg"
import {Link} from 'react-router-dom';

import "./header.css";

export default () => {

    const toggleSideMenu = () => {
        const sideBar = document.getElementById("sidebar");
        if(sideBar) {
            sideBar.classList.toggle("active")
        }
    }

    return (
        <nav id="header" className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#" onClick={toggleSideMenu}>
                <FontAwesomeIcon icon="ellipsis-v" className="sideMenu" />
                <strong> Web Trend BO</strong>
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    );
}