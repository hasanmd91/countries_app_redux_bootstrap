import React from "react";
import { Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Home = () => {
  return (
    <Container
      fluid
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "5px",
        color: "ActiveBorder",
      }}
    >
      <h5
        className="mb-5"
        style={{
          fontFamily: "Poppins Black 900, sans-serif",
          fontWeight: "900",
          fontSize: "40px",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundImage: "linear-gradient(to right, #f00, #00f)",
        }}
      >
        Ready to See the World? Let's Embark on an Adventure!
      </h5>
      <LinkContainer to="/register ">
        <Button size="lg"> Register </Button>
      </LinkContainer>
    </Container>
  );
};

export default Home;
