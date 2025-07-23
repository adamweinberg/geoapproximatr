import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateDistance, calculateScore } from "../../script/calcs";
import { saveDistance, saveScore, saveRoundData } from "../store/game";
import { resetLocation } from "../store/location";
import { resetGuess } from "../store/guess";
import ResultMap from "./ResultMap";
import BarGraph from "./BarGraph";

const RoundResult = () => {
  const dispatch = useDispatch();
  const { location, guess } = useSelector((state) => state);

  const [distance, setDistance] = useState(null);
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(true);

  const distanceRef = useRef(distance);
  const scoreRef = useRef(score);
  const locationRef = useRef(null);
  const guessRef = useRef(null);

  useEffect(() => {
    distanceRef.current = distance;
    scoreRef.current = score;
  });

  useEffect(() => {
    if (guess.latitude !== null && guess.longitude !== null && location.latitude && location.longitude) {
      const calculatedDistance = calculateDistance(guess, location);
      const calculatedScore = calculateScore(guess, location);
      setDistance(calculatedDistance);
      setScore(calculatedScore);
      
      // Capture the current round data when we calculate the results
      locationRef.current = { ...location };
      guessRef.current = { ...guess };
    }
  }, [guess, location]);

  useEffect(() => {
    return () => {
      dispatch(saveDistance(distanceRef.current)); //add distance and score to global state after unmount
      dispatch(saveScore(scoreRef.current));
      
      // Only save round data if we have valid captured data
      if (locationRef.current && guessRef.current && distanceRef.current !== null && scoreRef.current !== null) {
        dispatch(saveRoundData({
          location: locationRef.current,
          guess: guessRef.current,
          distance: distanceRef.current,
          score: scoreRef.current
        }));
      }
      
      dispatch(resetLocation()); //clear the location for the next round
      dispatch(resetGuess()); //clear the guess for the next round
    };
  }, []);

  return (
    <div>
      <ResultMap location={location} guess={guess} distance={distance} />
      {distance !== null && score !== null && distance >= 0 && score >= 0 && showResults ? (
        <div id="round-results" className="glass-card">
          <button 
            className="close-results-btn"
            onClick={() => setShowResults(false)}
            title="Hide results to see map clearly"
          >
            ✕
          </button>
          <div className="result-header">
            <h3>Round Complete!</h3>
          </div>
          <div className="result-stats">
            <div className="stat-item">
              <div className="stat-label">Distance</div>
              <div className="result-value">{Math.round(distance).toLocaleString()} miles</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-label">Score</div>
              <div className="result-value">{Math.round(score).toLocaleString()} points</div>
            </div>
          </div>
          <div className="score-visualization">
            <BarGraph score={score} />
          </div>
        </div>
      ) : distance !== null && score !== null && distance >= 0 && score >= 0 && !showResults ? (
        <button 
          className="show-results-btn"
          onClick={() => setShowResults(true)}
          title="Show round results"
        >
          Show Results
        </button>
      ) : (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <span>Calculating results...</span>
        </div>
      )}
    </div>
  );
};

export default RoundResult;
