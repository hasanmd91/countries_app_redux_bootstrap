import React from "react";
import { Button } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";

const Layout = () => {
  const Navigate = useNavigate();

  const [user] = useAuthState(auth);
  return (
    <Container fluid>
      <Row>
        <Navbar bg="light" variant="light">
          <Container className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                {user && (
                  <>
                    <LinkContainer to="/countries">
                      <Nav.Link>Countries</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/favourites">
                      <Nav.Link>Favourites</Nav.Link>
                    </LinkContainer>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
            <Button variant="outlined"> {user?.email} </Button>
            {user && <Button onClick={() => logout()}>Logout</Button>}
            {!user && <Button onClick={() => Navigate("/login")}>Login</Button>}
          </Container>
        </Navbar>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Container>
  );
};

export default Layout;
