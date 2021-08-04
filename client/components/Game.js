import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import Approximatr from "./Approximatr";
import RoundResult from "./RoundResult";
import { resetGame } from '../store/game'
import { resetGuess } from '../store/guess'
import { resetLocation } from '../store/location'
import { Button } from '@material-ui/core'

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
        (<Button id={activeStep % 2 === 1 ? 'submit-guess-button' : 'next-round-button'} onClick={handleSubmit}>
          {activeStep % 2 === 1 ? "Submit Guess" : "Next Round"}
        </Button>) : (
          <Button onClick={handleNewGame}>New Game</Button>
        ) }
      </React.Fragment>
    </div>
  );
};

export default Game;
