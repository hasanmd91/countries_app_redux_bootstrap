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
  Card,
} from "react-bootstrap";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  //useAuthState hook to listen for changes to the authentication state of the user
  //and returns an array that contains the current user object and a boolean indicating whether the user is currently authenticated.
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("please your name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/countries");
  }, [user, loading, navigate]);

  return (
    <Container
      fluid
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Row>
        <Col
          md="10"
          lg="6"
          className="my-auto order-2 order-lg-1 d-flex flex-column align-items-center"
        >
          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
            Sign up
          </p>
          <Form onSubmit={register}>
            <Form.Group className="mb-4">
              <InputGroup>
                <InputGroup.Text>
                  <i className="fas fa-user me-3"></i>
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
                  <i className="fas fa-envelope me-3"></i>
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
                  <i className="fas fa-lock me-3"></i>
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

        <Col
          md="10"
          lg="6"
          className="order-1 order-lg-2 d-flex align-items-center justify-content-center"
        >
          <Card.Img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
            fluid
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
