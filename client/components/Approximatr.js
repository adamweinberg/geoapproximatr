import React from 'react'
import { useSelector } from 'react-redux'
import StreetView from "./StreetView";
import Map from "./Map";

const Approximatr = (props) => {
  const { game } = useSelector(state => state)
  const { activeStep } = props
  let totalScore = 0
  let roundNumber = Math.ceil(activeStep / 2)

  const key = process.env.REACT_APP_API_KEY

  if ( game.scores.length > 0 ) {
    totalScore = game.scores.reduce((curr, acc) => acc + curr)
  }

  return (
    <div id="approximatr-container">
      <div id="game-header">
        <div id="round-and-score">
          <div className="score-card">
            <label>Round</label>
            <div className="value">
              {roundNumber}
              <span className="divisor">/5</span>
            </div>
          </div>
          <div className="score-card">
            <label>Score</label>
            <div className="value">
              {totalScore.toLocaleString()}
              <span className="divisor">/25,000</span>
            </div>
          </div>
        </div>
      </div>
      <div id="sv-and-map">
        <div id="sv-container">
          <StreetView API_KEY={key} />
        </div>
        <div id="map-container">
          <Map API_KEY={key} activeStep={activeStep} />
        </div>
      </div>
    </div>
  );
};

export default Approximatr;
