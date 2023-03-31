import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Row, Nav, Button, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout, auth } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

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
                  <Nav.Link>{user ? "Home" : ""}</Nav.Link>
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
