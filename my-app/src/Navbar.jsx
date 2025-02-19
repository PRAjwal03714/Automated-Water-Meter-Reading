import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from 'react-bootstrap/Image';

function NavBar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <Image 
            src="https://th.bing.com/th?id=OIP.GSAoXIhV6y0MxGextOB2SQAAAA&w=229&h=176&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" 
            alt="Logo" 
            width="80" 
            height="60" 
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" activeClassName="active">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/my-readings" activeClassName="active">
              My Readings
            </Nav.Link>
            <Nav.Link as={NavLink} to="/enquiry" activeClassName="active">
              Enquiry
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
