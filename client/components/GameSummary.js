import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import BarGraph from "./BarGraph";
import GameTable from "./GameTable";
import RoundSlideshow from "./RoundSlideshow";

const GameSummary = () => {
  const { game, auth } = useSelector((state) => state);
  const [gameSaved, setGameSaved] = useState(false);

  // Reset gameSaved flag when game arrays are reset (new game started)
  useEffect(() => {
    if (game.scores.length === 0 && game.distances.length === 0) {
      setGameSaved(false);
    }
  }, [game.scores.length, game.distances.length]);

  const totalScore = game.scores.length > 0 ? game.scores.reduce((curr, acc) => acc + curr, 0) : 0;
  const averageScore = game.scores.length > 0 ? Math.round(totalScore / game.scores.length) : 0;
  const bestRound = game.scores.length > 0 ? Math.max(...game.scores) : 0;
  const worstRound = game.scores.length > 0 ? Math.min(...game.scores) : 0;

  // Save game to database if user is logged in
  useEffect(() => {
    const saveGame = async () => {
      console.log('GameSummary save check:', {
        authId: auth.id,
        gameSaved,
        scoresLength: game.scores.length,
        distancesLength: game.distances.length,
        roundsLength: game.rounds.length,
        totalScore
      });
      
      if (auth.id && !gameSaved && game.scores.length === 5 && game.distances.length === 5 && totalScore > 0) {
        console.log('Attempting to save game...');
        try {
          const token = window.localStorage.getItem('token');
          const response = await axios.post('/api/games', {
            totalScore,
            rounds: game.rounds,
            distances: game.distances,
            scores: game.scores
          }, {
            headers: { authorization: token }
          });
          console.log('Game saved successfully:', response.data);
          setGameSaved(true);
        } catch (error) {
          console.error('Failed to save game:', error);
        }
      }
    };

    // Add a small delay to ensure all round data has been processed
    const timeoutId = setTimeout(saveGame, 100);
    return () => clearTimeout(timeoutId);
  }, [auth.id, gameSaved, game.scores.length, game.distances.length, totalScore]);

  const getPerformanceMessage = (score) => {
    if (score >= 20000) return { message: "Outstanding! Geographic genius!", emoji: "🌟" };
    if (score >= 15000) return { message: "Excellent! You know your world!", emoji: "⭐" };
    if (score >= 10000) return { message: "Great job! Keep exploring!", emoji: "🎉" };
    if (score >= 5000) return { message: "Good effort! Practice makes perfect!", emoji: "💪" };
    return { message: "Keep adventuring! Every journey teaches us!", emoji: "🚀" };
  };

  const performance = getPerformanceMessage(totalScore);

  return (
    <div id="game-summary" className="glass-card">
      <div className="summary-header">
        <h2>Game Complete!</h2>
        <div className="performance-message">
          <span className="performance-emoji">{performance.emoji}</span>
          <p>{performance.message}</p>
        </div>
      </div>
      
      <div className="final-score-container">
        <div className="score-label">Your Final Score</div>
        <div id="final-score">{totalScore.toLocaleString()}</div>
        <div className="score-max">out of 25,000</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card glass">
          <div className="stat-value">{averageScore.toLocaleString()}</div>
          <div className="stat-label">Average per Round</div>
        </div>
        <div className="stat-card glass">
          <div className="stat-value">{bestRound.toLocaleString()}</div>
          <div className="stat-label">Best Round</div>
        </div>
        <div className="stat-card glass">
          <div className="stat-value">{worstRound.toLocaleString()}</div>
          <div className="stat-label">Lowest Round</div>
        </div>
      </div>

      <div className="final-score-visualization">
        <BarGraph score={totalScore} isFinalScore={true} />
      </div>
      
      <RoundSlideshow rounds={game.rounds} />

      <GameTable
        totalScore={totalScore}
        distances={game.distances}
        scores={game.scores}
      />
    </div>
  );
};

export default GameSummary;
