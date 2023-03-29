import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../auth/firebase";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  //useAuthState hook to listen for changes to the authentication state of the user
  //and returns an array that contains the current user object and a boolean indicating whether the user is currently authenticated.
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const register = (e) => {
    e.preventDefault();
    if (!name) alert("no name");
    registerWithEmailAndPassword(name, email, password);
  };

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
            alt="register"
          />
        </Col>
        <Col col="4" md="5" className="my-auto">
          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
            Sign up
          </p>
          <Form onSubmit={register}>
            <Form.Group className="mb-4">
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-person-circle"></i>
                </InputGroup.Text>
                <FormControl
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "300px" }}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4">
              <InputGroup>
                <InputGroup.Text>
                  {" "}
                  <i className="bi bi-envelope-fill"></i>
                </InputGroup.Text>
                <FormControl
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4">
              <InputGroup>
                <InputGroup.Text>
                  {" "}
                  <i className="bi bi-shield-lock-fill"></i>
                </InputGroup.Text>
                <FormControl
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Button className="mb-4" size="lg" type="submit">
              Register
            </Button>
          </Form>
          <div>
            Already have an account?
            <Link to="/login">Login</Link> now.
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
