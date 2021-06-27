import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateDistance, calculateScore } from "../../script/calcs";
import { saveDistance, saveScore } from "../store/game";
import GameResult from "./GameResult";
import ResultMap from './ResultMap'

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
      if (activeStep !== 10) { //don't do it for the last round so we can start a new game... will need to figure out a workaround if i want to save total scores somewhere
        dispatch(saveDistance(distanceRef.current)); //add distance and score to global state after unmount
        dispatch(saveScore(scoreRef.current));
      }
    };
  }, []);

  return (
    <div>
      Round result
      {distance > -1 && score > -1 ? (
        <div id="round-results">
          <div>Your guess was {distance} miles away from the location </div>
          <div>You scored {score} points this round </div>
        </div>
      ) : (
        <span>loading...</span>
      )}
      <ResultMap location={location} guess={guess} distance={distance}/>
      {activeStep === 10 ? (
        <GameResult score={score} distance={distance} />
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default RoundResult;
