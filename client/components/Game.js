import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import Approximatr from "./Approximatr";
import RoundResult from "./RoundResult";
import GameResult from "./GameResult";
import { resetGame } from '../store/game'
import { resetGuess } from '../store/guess'
import { resetLocation } from '../store/location'

const rounds = 5;

const Game = () => {
  const dispatch = useDispatch()

  const [activeStep, setActiveStep] = useState(1);

  const handleSubmit = () => {
    setActiveStep(activeStep + 1);
  };

  const handleNewGame = () => {
    setActiveStep(1)
    dispatch(resetGame())
    dispatch(resetGuess())
    dispatch(resetLocation())
  }

  function getStepContent(step) {
    if (step % 2 === 1) {
      return <Approximatr activeStep={activeStep} />;
    } else {
      return <RoundResult activeStep={activeStep} />;
    }
  }

  return (
    <div id="game-container">
      <React.Fragment>
        {getStepContent(activeStep)}
        {activeStep !== rounds * 2 ?
        (<button onClick={handleSubmit}>
          {activeStep % 2 === 1 ? "Submit Guess" : "Next Round"}
        </button>) : (
          <button onClick={handleNewGame}>New Game</button>
        ) }
      </React.Fragment>
    </div>
  );
};

export default Game;
