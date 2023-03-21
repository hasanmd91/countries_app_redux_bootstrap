import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const numFormatter = require("@skalwar/simple_number_formatter");

const CountriesSingle = () => {
  const location = useLocation();
  const country = location.state.country;
  const navigate = useNavigate();
  const [weather, setweather] = useState("");
  const [error, setError] = useState(false);
  const [loading, setisLoading] = useState(true);

  console.log(country);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=41b01863299f8d6f641b250a5179d39f`
      )
      .then((res) => {
        setweather(res.data);
        setisLoading(false);
      })
      .catch((error) => setError(error));
  }, [country.capital, error]);

  if (loading)
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden"> Loading...</span>
        </Spinner>
      </Col>
    );
  return (
    <Container>
      <Row className="m-5">
        <Col>
          <Image thumbnail src={country.flags.svg} />
        </Col>
        <Col>
          <h2
            style={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundImage: "linear-gradient(to right, #f00, #00f)",
              fontWeight: "900",
              fontSize: "45px",
            }}
          >
            {country.name.common}{" "}
          </h2>
          <h6>Capital: {country.capital}</h6>
          <h6>
            Population:
            <span>{numFormatter(country.population)}</span>
          </h6>
          <h6>
            {" "}
            Currencies:
            <span>
              {Object.values(country.currencies || {})
                .map((currency) => currency.name)
                .join(", ")}
            </span>
          </h6>
          <h6>Languages:{Object.values(country.languages ?? {}).join(", ")}</h6>

          {!error && weather && (
            <div>
              <p>
                Right now it is <strong>{parseInt(weather.main.temp)}</strong>{" "}
                degrees in {country.capital} and{" "}
                {weather.weather[0].description}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            </div>
          )}

          <Col>
            <Button onClick={() => navigate("/countries")}>Go back</Button>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default CountriesSingle;
