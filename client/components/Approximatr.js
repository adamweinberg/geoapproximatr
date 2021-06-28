import React from 'react'
import { useSelector } from 'react-redux'
import StreetView from "./StreetView";
import Map from "./Map";

const Approximatr = (props) => {
  const { game } = useSelector(state => state)
  const { activeStep } = props
  let totalScore = 0

  if ( game.scores.length > 0 ) {
    totalScore = game.scores.reduce((curr, acc) => acc + curr)
  }

  return (
    <div id="approximatr-container">
      <div id="round-info">
        <p>Round: {Math.ceil(activeStep / 2)} / 5</p>
        <p>Score: {totalScore}</p>
      </div>
      <StreetView />
      <div id="map-and-buttons">
        <Map />
      </div>
    </div>
  );
};

export default Approximatr;
