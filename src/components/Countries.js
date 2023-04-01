import React, { useState } from "react";
import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { initializeCountries } from "../features/countries/countriesSlice";
import { Button, Spinner } from "react-bootstrap";
import { addFavourite } from "../features/countries/favouritesSlice";
import { toast } from "react-toastify";

const numFormatter = require("@skalwar/simple_number_formatter");

const Countries = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  const notify = () => toast("Added to favourites!");

  if (loading) return <Spinner animation="border" />;
  else
    return (
      <Container fluid>
        <Row>
          <Col className="mt-5 d-flex justify-content-center">
            <Form>
              <Form.Control
                style={{ width: "18rem" }}
                type="search"
                className="me-2 "
                placeholder="Search for countries"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Col>
        </Row>
        <Row xs={2} md={3} lg={4} className=" g-3">
          {countriesList
            .filter(
              (country) =>
                country.name.official
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                country.name.common.toLowerCase().includes(search.toLowerCase())
            )
            .map((country) => (
              <Col key={country.name.official} className="mt-5">
                <Card className="h-100">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{country.name.common}</Card.Title>
                    <Card.Subtitle className="mb-5 text-muted">
                      {country.name.official}
                    </Card.Subtitle>
                    <Card.Img
                      src={country?.flags?.svg}
                      alt={country.name.common}
                      className="rounded h-50"
                      style={{
                        objectFit: "cover",
                        minHeight: "200px",
                        maxHeight: "200px",
                      }}
                    />
                    <ListGroup
                      variant="flush"
                      className="flex-grow-1 justify-content-end"
                    >
                      <ListGroup.Item>
                        <i className="bi bi-translate me-2"></i>
                        <span>
                          {country.languages
                            ? Object.values(country.languages).join(", ")
                            : "---"}
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="bi bi-cash-coin me-2"></i>
                        <span>
                          {country.currencies
                            ? Object.values(country.currencies)
                                .map((currency) => currency.name)
                                .join(", ")
                            : "---"}
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="bi bi-people me-2"></i>
                        <span>{numFormatter(country.population)}</span>
                      </ListGroup.Item>
                    </ListGroup>
                    <Button
                      className="mb-1 shadow-none"
                      onClick={() => {
                        dispatch(addFavourite(country.name.common));
                        notify();
                      }}
                    >
                      {" "}
                      Add Favourites
                    </Button>
                    <LinkContainer
                      to={`/countries/${country.name.common}`}
                      state={{ country: country }}
                    >
                      <Button> See more </Button>
                    </LinkContainer>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
        <Row></Row>
      </Container>
    );
};

export default Countries;
