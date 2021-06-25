import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDistance } from "../store/guess";

const RoundResult = () => {
  const dispatch = useDispatch();
  const { location, guess } = useSelector((state) => state);

  const [distance, setDistance] = useState({ distance: null });

  useEffect(() => {
    dispatch(getDistance(guess, location));
    if (guess) {
      setDistance("fhdas");
    }
  }, [distance]);

  return (
    <div>
      Round result
      {guess.distance ? (
        <div>Your guess was {guess.distance} miles away from the location </div>
      ) : (
        <span>loading...</span>
      )}
    </div>
  );
};

export default RoundResult;
