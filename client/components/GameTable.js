import React from "react";

const GameTable = (props) => {
  const { totalScore, distances, scores } = props;

  const getPerformanceLevel = (score) => {
    if (score >= 4500) return "Excellent";
    if (score >= 3500) return "Great";
    if (score >= 2500) return "Good";
    if (score >= 1500) return "Fair";
    return "Poor";
  };

  return (
    <div className="game-table-container">
      <div className="table-header">
        <h3>Round by Round Breakdown</h3>
      </div>
      <div className="modern-table">
        <div className="table-header-row">
          <div className="table-cell">Round</div>
          <div className="table-cell">Distance</div>
          <div className="table-cell">Score</div>
          <div className="table-cell">Performance</div>
        </div>
        {distances.map((distance, index) => (
          <div key={index} className="table-row">
            <div className="table-cell">
              <span className="round-number">{index + 1}</span>
            </div>
            <div className="table-cell">
              <span className="distance-value">
                {distance !== null && distance !== undefined ? Math.round(distance).toLocaleString() : 'N/A'} mi
              </span>
            </div>
            <div className="table-cell">
              <span className="score-value">
                {scores[index] !== null && scores[index] !== undefined ? Math.round(scores[index]).toLocaleString() : 'N/A'}
              </span>
            </div>
            <div className="table-cell">
              <span className="performance-level">
                {scores[index] !== null && scores[index] !== undefined ? getPerformanceLevel(scores[index]) : 'N/A'}
              </span>
            </div>
          </div>
        ))}
        <div className="table-total-row">
          <div className="table-cell total-label" colSpan="2">
            Final Score
          </div>
          <div className="table-cell"></div>
          <div className="table-cell total-score">
            {totalScore.toLocaleString()}
          </div>
          <div className="table-cell">
            <span className="final-label">Final</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameTable;
