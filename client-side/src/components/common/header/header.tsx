import * as React from "react";
import {Link, withRouter} from 'react-router-dom';
import {IHeaderState} from "./header.interface";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem} from 'reactstrap';
import {loggedIn, getUser, logout} from "../../../helpers/auth/authHelperMethods";

class HeaderComponent extends React.Component<{history}, IHeaderState> {
    constructor(props) {
        super(props);

        this.state = {isOpen: false};

        this.toggle = this.toggle.bind(this);
        this.loggedInOrOut = this.loggedInOrOut.bind(this);
        this.logout = this.logout.bind(this);
    }

    public render() {
        return (
            <div>
                <Navbar color="dark" dark={true} expand="md">
                    <NavbarBrand href="/">BACK OFFICE</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar={true}>
                        <Nav className="ml-auto" navbar={true}>
                            { this.loggedInOrOut()}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }

    public toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    public loggedInOrOut = () => {
        if(loggedIn()) {
            const user = getUser();
            // Add any menu items that should be visible when the user is logged in
            return (
                <div>
                    <p className="nav-link">Welcome {user.name}</p>
                    <NavItem>
                        <p className="nav-link" onClick={this.logout}>Log Out</p>
                    </NavItem>
                </div>
            )
        } else {
            // Add any menu items that should be visible when the user is logged out
            return (
                <NavItem >
                    <Link className="nav-link" to="/">Login</Link>
                </NavItem>
            )
        }
    }

    public logout = () => {
        logout();
        this.props.history.push("/");
    }
}

const Header = withRouter(HeaderComponent);
export { Header, HeaderComponent };