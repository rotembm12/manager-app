import React from 'react';
import './Header.css';
import {
    Row,
    Col,
    Navbar,
    Nav,
    NavbarBrand,
    Container,
    Form,
    FormControl,
    Button
} from 'react-bootstrap';

const Header = ({ user, onUserLogout }) => {
    return (
        <Container fluid='true'>
            <Navbar bg='dark' expand='false'>
                <NavbarBrand>Manager App</NavbarBrand>

                <Nav.Item>
                    <Nav.Link as='title'>
                        Welcome {user ? user.name : 'Guest'}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    {user ? (
                        <Nav.Link onClick={onUserLogout}>Logout</Nav.Link>
                    ) : (
                        ''
                    )}
                </Nav.Item>
            </Navbar>
        </Container>
    );
};
export default Header;
