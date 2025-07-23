import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Approximatr from "./Approximatr";
import RoundResult from "./RoundResult";
import GameSummary from "./GameSummary";
import { resetGame } from "../store/game";
import { resetGuess } from "../store/guess";
import { resetLocation } from "../store/location";

const Game = () => {
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(1);

  const handleSubmit = () => {
    setActiveStep(activeStep + 1);
  };

  const handleNewGame = () => {
    setActiveStep(1);
    dispatch(resetGame());
    dispatch(resetGuess());
    dispatch(resetLocation());
  };

  function getStepContent(step) {
    if (step === 11) {
      return (
        <React.Fragment>
          <GameSummary handleNewGame={handleNewGame} />
          <button 
            id="new-game-button" 
            className="action-button btn btn-primary"
            onClick={handleNewGame}
          >
            New Game
          </button>
        </React.Fragment>
      );
    } else if (step === 10) {
      return (
        <React.Fragment>
          <RoundResult activeStep={activeStep} />
          <button 
            onClick={handleSubmit} 
            id="next-round-button"
            className="action-button btn btn-primary"
          >
            Game Summary
          </button>
        </React.Fragment>
      );
    } else if (step % 2 === 1) {
      return (
        <React.Fragment>
          <Approximatr activeStep={activeStep} />
          <button 
            id="submit-guess-button" 
            className="action-button btn btn-accent"
            onClick={handleSubmit}
          >
            Submit Guess
          </button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <RoundResult />
          <button 
            id="next-round-button" 
            className="action-button btn btn-primary"
            onClick={handleSubmit}
          >
            Next Round
          </button>
        </React.Fragment>
      );
    }
  }

  return <div id="game-container">{getStepContent(activeStep)}</div>;
};

export default Game;
