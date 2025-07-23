import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../public/logo.png";

const Home = () => {
  const { id: isLoggedIn, username } = useSelector(state => state.auth);

  return (
    <div id="home-container">
      <img src={logo} alt="GeoApproximatr Logo" />
      <h1 id="welcome">
        {isLoggedIn ? `Welcome back, ${username}!` : 'Welcome to GeoApproximatr'}
      </h1>
      <p id="click-start">Discover the world through street views and test your geographic knowledge</p>
      <div id="home-buttons">
        <Link to="/game" className="btn btn-accent">
          Start Game
        </Link>
        {isLoggedIn ? (
          <Link to="/dashboard" className="btn btn-primary">
            View Dashboard
          </Link>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/signup" className="btn btn-secondary">
              Sign Up
            </Link>
          </>
        )}
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
          <h3>Track & Compete</h3>
          <p>Save your high scores and review past games</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
