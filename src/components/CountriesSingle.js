import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Image, Button, Spinner } from "react-bootstrap"; //// prettier-ignore
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const numFormatter = require("@skalwar/simple_number_formatter");

const CountriesSingle = () => {
  const location = useLocation();
  const country = location.state.country;
  const navigate = useNavigate();
  const [weather, setweather] = useState("");
  const [error, setError] = useState(false);
  const [loading, setisLoading] = useState(true);

  const countriesList = useSelector((state) => state.countries.countries);

  console.log(country);

  const borderCountry = (border) => {
    console.log(border);

    let country = countriesList.find((c) => c.cca3?.includes(border));

    if (country) {
      navigate(`/countries/${country.name.common}`, { state: { country } });
    }
    return;
  };

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
  }, [country.capital]);
  if (!country) return <div>No country data found</div>;

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
          <Image thumbnail fluid src={country.flags.svg} className="mb-3" />
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
          <h6>continents: {country.continents?.map((c) => c).join(", ")}</h6>
          <h6>
            Population:
            <span>{numFormatter(country.population)}</span>
          </h6>
          <h6>
            Currencies:
            <span>
              {Object.values(country.currencies || {})
                .map((currency) => currency.name)
                .join(", ")}
            </span>
          </h6>
          <h6>Languages:{Object.values(country.languages ?? {}).join(", ")}</h6>

          <div className="flex flex-wrap justify-start items-center mb-4">
            <span className="inline-block w-[160px] font-bold mb-3">
              Border countries:
            </span>
            {country?.borders
              ? country?.borders.map((border) => (
                  <Button
                    className="btn-dark btn-sm mx-2 mb-2 shadow-lg px-4 "
                    key={border}
                    onClick={() => borderCountry(border)}
                  >
                    {border}
                  </Button>
                ))
              : " No info found"}
          </div>
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
                className="img-thumbnail  shadow-lg mb-4"
              />
            </div>
          )}

          <Button
            className="btn-sm"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CountriesSingle;
