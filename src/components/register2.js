import {
  Button,
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";

function reg() {
  return (
    <Container fluid>
      <Card className="text-black m-5" style={{ borderRadius: "25px" }}>
        <Card.Body>
          <Row>
            <Col
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Sign up
              </p>
              <Form>
                <Form.Group className="mb-4">
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="fas fa-user me-3"></i>
                    </InputGroup.Text>
                    <FormControl placeholder="Your Name" />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-4">
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="fas fa-envelope me-3"></i>
                    </InputGroup.Text>
                    <FormControl type="email" placeholder="Your Email" />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-4">
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="fas fa-lock me-3"></i>
                    </InputGroup.Text>
                    <FormControl type="password" placeholder="Password" />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    label="Subscribe to our newsletter"
                  />
                </Form.Group>

                <Button className="mb-4" size="lg">
                  Register
                </Button>
              </Form>
            </Col>

            <Col
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <Card.Img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default reg;
