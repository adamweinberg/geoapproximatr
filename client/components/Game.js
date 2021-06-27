import React, { useState } from "react";
import Approximatr from "./Approximatr";
import RoundResult from "./RoundResult";
import GameResult from "./GameResult";

const rounds = 5;

const Game = () => {
  const [activeStep, setActiveStep] = useState(1);

  const handleSubmit = () => {
    setActiveStep(activeStep + 1);
  };

  const handleNewGame = () => {
    //new game code here
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
