import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateDistance, calculateScore } from "../../script/calcs";
import { saveDistance, saveScore } from "../store/game";
import { resetLocation } from "../store/location";
import ResultMap from "./ResultMap";
import BarGraph from "./BarGraph";

const RoundResult = (props) => {
  const { activeStep } = props;
  const dispatch = useDispatch();
  const { location, guess } = useSelector((state) => state);

  const [distance, setDistance] = useState(null);
  const [score, setScore] = useState(null);

  const distanceRef = useRef(distance);
  const scoreRef = useRef(score);

  useEffect(() => {
    distanceRef.current = distance;
    scoreRef.current = score;
  });

  useEffect(() => {
    setDistance(calculateDistance(guess, location));
    setScore(calculateScore(guess, location));
  }, [distance, score]);

  useEffect(() => {
    return () => {
      if (activeStep !== 10) {
        //don't do it for the last round so we can start a new game... will need to figure out a workaround if i want to save total scores somewhere
        dispatch(saveDistance(distanceRef.current)); //add distance and score to global state after unmount
        dispatch(saveScore(scoreRef.current));
      }
      dispatch(resetLocation()); //clear the location for the next round
    };
  }, []);

  return (
    <div>
      <ResultMap location={location} guess={guess} distance={distance} />
      {distance > -1 && score > -1 ? (
        <div id="round-results">
          <div>
            Your guess was{" "}
            <span className="result-value">{distance} miles</span> away from the
            location.
          </div>
          <div>
            You scored <span className="result-value">{score} points</span> this
            round.
          </div>
          <BarGraph score={score} />
        </div>
      ) : (
        <span>loading...</span>
      )}
    </div>
  );
};

export default RoundResult;
