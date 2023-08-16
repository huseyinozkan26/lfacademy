import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    Container,
} from 'reactstrap';

import Login from "../component/Login"

function Navi(args) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Container>
            <Navbar
                expand="md"
                color='dark'
                dark={true}
            >
                <NavbarBrand href="/">LF Academy</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>

                        <NavItem>
                            <Link className='nav-link' to="/about">LF Academy Nedir?</Link>
                        </NavItem>
                        <NavItem>
                            <Link className='nav-link' to="http://lf8056.com.tr">Laissez Faire FRC Web Sitesi</Link>
                        </NavItem>

                    </Nav>
                    <Nav>
                        <UncontrolledDropdown nav inNavbar>
                            <Login/>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </Container>
    );
}

export default Navi;