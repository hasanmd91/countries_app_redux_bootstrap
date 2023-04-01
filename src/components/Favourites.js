import React, { useEffect, useState } from "react";
import { Button, Spinner, Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap"; // prettier-ignore

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { initializeCountries } from "../features/countries/countriesSlice";
import {
  clearFavourites,
  clearOneFavourites,
} from "../features/countries/favouritesSlice";
const numFormatter = require("@skalwar/simple_number_formatter");

const Favourites = () => {
  const dispatch = useDispatch();

  let countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState("");
  const favouritesList = useSelector((state) => state.favourites.favourites);
  if (favouritesList !== null) {
    countriesList = countriesList.filter((c) =>
      favouritesList.includes(c.name.common)
    );
  } else {
    countriesList = [];
  }

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  const notify = () => toast("Removed from the list!");
  const allClear = () => toast("All Removed!");

  if (loading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

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
          .filter((c) => {
            return c.name.official.toLowerCase().includes(search.toLowerCase());
          })
          .map((country) => (
            <Col className="mt-5" key={country.name.common}>
              <Card className="h-100">
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{country.name.common}</Card.Title>
                  <Card.Subtitle className="mb-3 text-muted">
                    {country.name.official}
                  </Card.Subtitle>
                  <LinkContainer
                    to={`/countries/${country.name.common}`}
                    state={{ country: country }}
                  >
                    <Card.Img
                      variant="top"
                      src={country.flags.svg}
                      className="rounded h-50 mb-2"
                      style={{
                        objectFit: "cover",
                        minHeight: "200px",
                        maxHeight: "200px",
                      }}
                    />
                  </LinkContainer>
                  <ListGroup
                    variant="flush"
                    className="flex-grow-1 justify-content-end"
                  >
                    <ListGroup.Item>
                      <i className="bi bi-translate me-2"></i>
                      {Object.values(country.languages ?? {}).join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="bi bi-cash-coin me-2"></i>
                      {Object.values(country.currencies || {})
                        .map((currency) => currency.name)
                        .join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="bi bi-people me-2"></i>
                      {numFormatter(country.population)}
                    </ListGroup.Item>
                  </ListGroup>

                  <Button
                    className="shadow-none"
                    onClick={() => {
                      dispatch(clearOneFavourites(country.name.common));
                      notify();
                    }}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      {favouritesList.length > 0 && (
        <Row
          xs={2}
          md={3}
          lg={4}
          className="g-3 mt-2 mb-5 d-flex justify-content-center"
        >
          <Button
            className="shadow-none"
            onClick={() => {
              dispatch(clearFavourites());
              allClear();
            }}
          >
            Clear All Favorites
          </Button>
        </Row>
      )}
    </Container>
  );
};

export default Favourites;
