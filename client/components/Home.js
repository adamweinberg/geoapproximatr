import React from "react";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const Home = () => {
  return (
    <Link to="/game">
      <div id="home-container">
        <h1>Welcome to GeoApproximatr</h1>
        <h3>Click anywhere to begin your journey</h3>
      </div>
    </Link>
  );
};

export default Home;
