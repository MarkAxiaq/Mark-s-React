import * as React from "react";
import {Link} from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
      <ul className="nav justify-content-center navbar-dark bg-dark fixed-bottom">
          <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
          </li>
      </ul>
  );
};
export default Footer;
