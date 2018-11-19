import * as React from "react";
import {Link} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

export default class Header extends React.Component<{}, {isOpen}> {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {isOpen: false};
    }

    public render() {
        return (
            <div>
                <Navbar color="dark" dark={true} expand="md">
                    <NavbarBrand href="/">BLACK OFFICE</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar={true}>
                        <Nav navbar={true}>
                            <NavItem>
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link" to="/about">About</Link>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar={true}>
                            <UncontrolledDropdown nav={true} inNavbar={true}>
                                <DropdownToggle nav={true} caret={true}>
                                    Logged In ???
                                </DropdownToggle>
                                <DropdownMenu right={true}>
                                    <DropdownItem>
                                        My Profile
                                    </DropdownItem>
                                    <DropdownItem>
                                        Change Password
                                    </DropdownItem>
                                    <DropdownItem divider={true} />
                                    <DropdownItem>
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
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
}