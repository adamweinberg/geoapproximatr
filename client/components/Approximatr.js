import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import StreetView from "./StreetView";
import Map from "./Map";
import { submitGuess } from '../store/guess'

const Approximatr = () => {
  const dispatch = useDispatch()

  const [guess, setGuess] = useState({
    latitude: 0,
    longitude: 0
  })

  const guessRef = useRef(guess)

  const handleChange = (event) => {
    setGuess({
      ...guess,
      [event.target.name]: Number(event.target.value).toFixed(7)
    })
  }

  useEffect(() => {
    guessRef.current = guess
  })

  useEffect(() => {
    return () => dispatch(submitGuess(guessRef.current)) //put the guess onto global state
  }, [])

  return (
    <div id="approximatr-container">
      <div id="round-info">
        <p>Round: </p>
        <p>Score: </p>
      </div>
      <StreetView />
      <div id="map-and-buttons">
        <button>Return to Start</button>
        <Map />
      </div>
      <form>
        <label htmlFor="latitude">Latitude: </label>
        <input onChange={handleChange} type='number' id='latitude' name='latitude'/>
        <label htmlFor="longitude">Longitude: </label>
        <input onChange={handleChange} type='number' id='longitude' name='longitude'/>
      </form>
    </div>
  );
};

export default Approximatr;
