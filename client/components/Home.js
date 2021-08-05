import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png";

const Home = () => {
  return (
    <div id="home-container">
      <img src={logo} />
      <div id="welcome">Welcome to GeoApproximatr</div>
      <div id="click-start">Click Start Game to begin your journey</div>
      <div id="home-buttons">
        <Button id="start-game-button">
          <Link to="/game">Start Game</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
