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
import AuthHelperMethods from "../../../helpers/auth/authHelperMethods";

const Auth = new AuthHelperMethods();

class Header extends React.Component<{history}, IHeaderState> {
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
                    <NavbarBrand href="/">BLACK OFFICE</NavbarBrand>
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

    private toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    private loggedInOrOut = () => {
        if(Auth.loggedIn()) {
            const userProfile = Auth.getProfile();
            // Add any menu items that should be visible when the user is logged in
            return (
                <>
                    <p className="nav-link">Welcome {userProfile.name} {userProfile.surname}</p>
                    <NavItem>
                        <p className="nav-link" onClick={this.logout}>Log Out</p>
                    </NavItem>
                </>
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

    private logout = () => {
        Auth.logout();
        this.props.history.push("/");
    }
}

export default withRouter(Header);