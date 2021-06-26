import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDistance, getScore } from "../store/guess";

const RoundResult = () => {
  const dispatch = useDispatch();
  const { location, guess } = useSelector((state) => state);

  const [distance, setDistance] = useState({ distance: null });
  const [score, setScore] = useState({score: null})

  useEffect(() => {
    if (guess) {
      setDistance("");
    }
    dispatch(getDistance(guess, location));

    // if (guess.distance) {
    //   setScore('')
    // }
    // dispatch(getScore(guess.distance))
  }, [distance]);

  return (
    <div>
      Round result
      {guess.distance ? (
        <div>Your guess was {guess.distance} miles away from the location </div>
      ) : (
        <span>loading...</span>
      )}
      {guess.score ? (
        <div>You scored {guess.score} points this round </div>
      ) : (
        <span>loading...</span>
      )}
    </div>
  );
};

export default RoundResult;
