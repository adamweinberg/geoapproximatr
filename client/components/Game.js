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

  function getStepContent(step) {
    if (step % 2 === 1) {
      return <Approximatr />;
    } else {
      return <RoundResult />;
    }
  }

  return (
    <div id="game-container">
      {activeStep === rounds * 2 ? (
        <GameResult />
      ) : (
        <React.Fragment>
          {getStepContent(activeStep)}
          <button onClick={handleSubmit}>
            {activeStep % 2 === 1 ? "Submit Guess" : "Next Round"}
          </button>
        </React.Fragment>
      )}
    </div>
  );
};

export default Game;
