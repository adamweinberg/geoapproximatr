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
        {isLoggedIn ? `Welcome, ${username}!` : 'Welcome to GeoApproximatr'}
      </h1>
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
    </div>
  );
};

export default Home;
