import React from 'react'
import { useSelector } from 'react-redux'
import StreetView from "./StreetView";
import Map from "./Map";
import keys from '../../script/keys';

const Approximatr = (props) => {
  const { game } = useSelector(state => state)
  const { activeStep } = props
  let totalScore = 0
  let roundNumber = Math.ceil(activeStep / 2)

  if ( game.scores.length > 0 ) {
    totalScore = game.scores.reduce((curr, acc) => acc + curr)
  }

  return (
    <div id="approximatr-container">
      <div id="round-and-score">
        <div id='round-info'>
          <label>ROUND</label>
          <p>{roundNumber}
            <span className='divisor'>/5</span>
          </p>
        </div>
        <div id='score-info'>
          <label>SCORE</label>
          <p>{totalScore}
            <span className='divisor'>/25000</span>
          </p>
        </div>
      </div>
      <div id="sv-and-map">
        <StreetView API_KEY={keys.streetview} />
        <Map API_KEY={keys.maps} activeStep={activeStep} />
      </div>
    </div>
  );
};

export default Approximatr;
