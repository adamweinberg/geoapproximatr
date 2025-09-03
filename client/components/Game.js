import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Approximatr from "./Approximatr";
import RoundResult from "./RoundResult";
import GameSummary from "./GameSummary";
import { resetGame } from "../store/game";
import { resetGuess } from "../store/guess";
import { resetLocation } from "../store/location";

const Game = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [activeStep, setActiveStep] = useState(1);

  // Add beforeunload protection during active game
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Only show warning if game is in progress (not on final summary)
      if (activeStep <= 10) {
        event.preventDefault();
        event.returnValue = ''; // Chrome requires returnValue to be set
        return ''; // Some browsers require a return value
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [activeStep]);

  // Block in-app navigation during active game
  useEffect(() => {
    const unblock = history.block((location, action) => {
      // Only block if game is in progress (not on final summary)
      if (activeStep <= 10) {
        return 'Are you sure you want to leave the game? Your progress will be lost.';
      }
    });

    return unblock;
  }, [history, activeStep]);

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
