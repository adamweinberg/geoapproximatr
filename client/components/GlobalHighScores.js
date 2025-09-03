import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, Zap, Globe, Target } from 'lucide-react';
import axios from 'axios';

const GlobalHighScores = () => {
  const [activeTab, setActiveTab] = useState('all-time');
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = [
    { id: 'all-time', label: 'All Time', icon: Trophy },
    { id: '30-days', label: 'Past 30 Days', icon: Calendar },
    { id: '24-hours', label: 'Past 24 Hours', icon: Zap }
  ];

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/api/games/global/${activeTab}`);
        setScores(response.data);
      } catch (err) {
        setError('Failed to load high scores');
        console.error('Error fetching global high scores:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [activeTab]);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getScoreGradient = (rank) => {
    if (rank === 1) return 'rank-1';
    if (rank === 2) return 'rank-2';
    if (rank === 3) return 'rank-3';
    return 'rank-other';
  };

  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <span>Loading global high scores...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard-container">
        <div className="error-container">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1><Globe size={28} className="inline-icon" /> Global Leaderboard</h1>
        <p>See how you stack up against players worldwide</p>
      </div>

      <div className="leaderboard-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon"><tab.icon size={18} /></span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="leaderboard-content">
        {scores.length > 0 ? (
          <div className="scores-list">
            {scores.map((game, index) => {
              const rank = index + 1;
              return (
                <div key={game.id} className={`score-item ${getScoreGradient(rank)}`}>
                  <div className="rank-badge">
                    <span className="rank-icon">{getRankIcon(rank)}</span>
                  </div>
                  
                  <div className="player-info">
                    <div className="username">{game.user.username}</div>
                    <div className="game-date">
                      {new Date(game.completedAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="score-details">
                    <div className="total-score">{game.totalScore.toLocaleString()}</div>
                    <div className="score-breakdown">
                      <span>Avg: {game.averageScore.toLocaleString()}</span>
                      <span>•</span>
                      <span>Best: {game.bestRound.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-scores">
            <div className="no-scores-icon"><Target size={48} /></div>
            <h3>No scores yet!</h3>
            <p>Be the first to set a high score in this time period.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalHighScores;