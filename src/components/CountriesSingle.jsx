import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

const CountriesSingle = () => {
  const [weather, setweather] = useState("");

  const countryTest = {
    cpaital: "helsinki",
  };

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${countryTest.cpaital}&appid=${process.env.REACT_APP_OPEN_WEATHERKEY}`
      )
      .then((res) => setweather(res.data));
  }, []);

  return (
    <Container>
      <div>Single Country will be here</div>
    </Container>
  );
};

export default CountriesSingle;
