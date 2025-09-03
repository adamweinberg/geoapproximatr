import React from 'react';
import { Star, Trophy, PartyPopper, Sparkles, Rocket, X } from 'lucide-react';
import BarGraph from './BarGraph';
import GameTable from './GameTable';
import RoundSlideshow from './RoundSlideshow';
import getPerformanceMessage from "../script/get-performance-message";

const GameSummaryModal = ({ game, onClose }) => {
  if (!game) return null;

  const performance = getPerformanceMessage(game.totalScore);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Game Summary</h2>
          <button className="close-modal-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="modal-body">
          <div id="game-summary" className="glass-card">
            <div className="summary-header">
              <h2>Game Complete!</h2>
              <div className="performance-message">
                <span className="performance-icon"><performance.icon size={24} /></span>
                <p>{performance.message}</p>
              </div>
              <div className="game-date">
                Played on {new Date(game.completedAt).toLocaleDateString()}
              </div>
            </div>
            
            <div className="final-score-container">
              <div className="score-label">Your Final Score</div>
              <div id="final-score">{game.totalScore.toLocaleString()}</div>
              <div className="score-max">out of 25,000</div>
            </div>

            <div className="stats-grid">
              <div className="stat-card glass">
                <div className="stat-value">{game.averageScore.toLocaleString()}</div>
                <div className="stat-label">Average per Round</div>
              </div>
              <div className="stat-card glass">
                <div className="stat-value">{game.bestRound.toLocaleString()}</div>
                <div className="stat-label">Best Round</div>
              </div>
              <div className="stat-card glass">
                <div className="stat-value">{game.worstRound.toLocaleString()}</div>
                <div className="stat-label">Lowest Round</div>
              </div>
            </div>

            <div className="final-score-visualization">
              <BarGraph score={game.totalScore} isFinalScore={true} />
            </div>
            
            <RoundSlideshow rounds={game.rounds} />

            <GameTable
              totalScore={game.totalScore}
              distances={game.distances}
              scores={game.scores}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSummaryModal;