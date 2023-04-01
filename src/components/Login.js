import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/countries");
  }, [user, loading, navigate]);

  return (
    <Container fluid className="p-5">
      <Row>
        <Col col="8" md="7">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
            className="img-fluid"
            alt="login"
          />
        </Col>
        <Col col="4" md="5" className="my-auto">
          <Form>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-envelope-fill"></i>
                </InputGroup.Text>
                <FormControl
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-shield-lock-fill"></i>
                </InputGroup.Text>
                <FormControl
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />

              <p>
                Not yet register? <Link to="/register">Register</Link>{" "}
              </p>
            </Form.Group>

            <Button
              className="mb-4 w-100"
              variant="primary"
              size="lg"
              onClick={() => loginWithEmailAndPassword(email, password)}
            >
              Sign in
            </Button>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Follow us on </p>
              <img className="icons" src={facebook} alt="facebook" />
              <img className="icons" src={instagram} alt="instagram" />
              <img className="icons" src={twitter} alt="twitter" />
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
