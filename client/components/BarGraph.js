import React from "react";

const BarGraph = (props) => {
  const { score, isFinalScore } = props;
  
  const maxScore = isFinalScore ? 25000 : 5000;
  const percentage = (score / maxScore) * 100;
  const clampedPercentage = Math.min(percentage, 100);

  const getGradient = (percent) => {
    if (percent >= 80) return 'var(--success-gradient)';
    if (percent >= 60) return 'var(--accent-gradient)';
    if (percent >= 40) return 'var(--primary-gradient)';
    return 'var(--secondary-gradient)';
  };

  return (
    <div className="score-bar-container">
      <div className="score-bar-header">
        <span className="score-bar-label">
          {isFinalScore ? 'Overall Performance' : 'Round Performance'}
        </span>
      </div>
      <div className="score-bar-track">
        <div 
          className="score-bar-fill"
          style={{
            width: `${clampedPercentage}%`,
            background: getGradient(clampedPercentage)
          }}
        >
          <div className="score-bar-shine"></div>
        </div>
      </div>
      <div className="score-bar-labels">
        <span>0</span>
        <span>{maxScore.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default BarGraph;
