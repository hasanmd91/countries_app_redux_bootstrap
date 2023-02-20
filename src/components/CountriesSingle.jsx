import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const CountriesSingle = () => {
  const location = useLocation();
  const country = location.state.country;
  const navigate = useNavigate();
  const [weather, setweather] = useState("");
  const [error, setError] = useState(false);
  const [loading, setisLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_OPEN_WEATHERKEY}`
      )
      .then((res) => {
        console.log(res);
        setweather(res.data);
        setisLoading(false);
      })
      .catch((error) => console.log(error), setError(error));
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
          <Image
            thumbnail
            src={`https://source.unsplash.com/featured/1600x900?${country.cpaital}`}
          />
        </Col>
        <Col>
          <h2 className="display-4">{country.name.common} </h2>
          <h3>{country.capital}</h3>
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
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="light" onClick={() => navigate("/countries")}>
            Go back
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CountriesSingle;
