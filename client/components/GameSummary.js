import React from "react";
import { useSelector } from "react-redux";
import BarGraph from "./BarGraph";
import GameTable from "./GameTable";

const GameSummary = () => {
  const { game } = useSelector((state) => state);

  const totalScore = game.scores.reduce((curr, acc) => acc + curr);

  return (
    <div id="game-summary">
      <div>
        Your final score is <span id="final-score">{totalScore}</span>
      </div>
      <BarGraph score={totalScore} isFinalScore={true} />
      <GameTable
        totalScore={totalScore}
        distances={game.distances}
        scores={game.scores}
      />
    </div>
  );
};

export default GameSummary;
