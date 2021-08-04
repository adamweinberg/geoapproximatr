import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Approximatr from "./Approximatr";
import RoundResult from "./RoundResult";
import GameSummary from "./GameSummary";
import { resetGame } from "../store/game";
import { resetGuess } from "../store/guess";
import { resetLocation } from "../store/location";
import { Button } from "@material-ui/core";

const rounds = 5;

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
    if (step === rounds * 2 + 1) {
      return (
        <React.Fragment>
          <GameSummary handleNewGame={handleNewGame} />
          <Button onClick={handleNewGame}>New Game</Button>
        </React.Fragment>
      );
    } else if (step === rounds * 2) {
      return (
        <React.Fragment>
          <RoundResult activeStep={activeStep} />
          <Button onClick={handleSubmit} id="next-round-button">
            Game Summary
          </Button>
        </React.Fragment>
      );
    } else if (step % 2 === 1) {
      return (
        <React.Fragment>
          <Approximatr activeStep={activeStep} />
          <Button id="submit-guess-button" onClick={handleSubmit}>
            Submit Guess
          </Button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <RoundResult activeStep={activeStep} />
          <Button id="next-round-button" onClick={handleSubmit}>
            Next Round
          </Button>
        </React.Fragment>
      );
    }
  }

  return <div id="game-container">{getStepContent(activeStep)}</div>;
};

export default Game;
