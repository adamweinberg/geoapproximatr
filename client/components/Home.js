import React from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png";

const Home = () => {
  return (
    <div id="home-container">
      <img src={logo} alt="GeoApproximatr Logo" />
      <h1 id="welcome">Welcome to GeoApproximatr</h1>
      <p id="click-start">Discover the world through street views and test your geographic knowledge</p>
      <div id="home-buttons">
        <Link to="/game" className="btn btn-accent">
          Start Game
        </Link>
        <button className="btn btn-primary">
          How to Play
        </button>
      </div>
      <div className="features-grid">
        <div className="feature-card glass-card">
          <div className="feature-icon">🎯</div>
          <h3>Precision Challenge</h3>
          <p>Drop pins with accuracy to maximize your score</p>
        </div>
        <div className="feature-card glass-card">
          <div className="feature-icon">🌎</div>
          <h3>Global Exploration</h3>
          <p>Explore random locations from around the world</p>
        </div>
        <div className="feature-card glass-card">
          <div className="feature-icon">🏆</div>
          <h3>Score & Compete</h3>
          <p>Track your progress and challenge yourself</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
