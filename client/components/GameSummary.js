import React from "react";
import { useSelector } from "react-redux";
import GameTable from "./GameTable";

const GameSummary = () => {
  const { game } = useSelector((state) => state);

  const totalScore = game.scores.reduce((curr, acc) => acc + curr);

  return (
    <div>
      Your total score was {totalScore}! Nice job!
      <GameTable totalScore={totalScore} game={game} />
    </div>
  );
};

export default GameSummary;
