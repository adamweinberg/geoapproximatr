import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GameSummaryModal from './GameSummaryModal';

const UserDashboard = () => {
  const { username, id } = useSelector(state => state.auth);
  const [highScores, setHighScores] = useState([]);
  const [recentGames, setRecentGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserGames = async () => {
      try {
        setLoading(true);
        const token = window.localStorage.getItem('token');
        
        const [highScoresRes, recentGamesRes] = await Promise.all([
          axios.get('/api/games/high-scores', {
            headers: { authorization: token }
          }),
          axios.get('/api/games/recent', {
            headers: { authorization: token }
          })
        ]);

        setHighScores(highScoresRes.data);
        setRecentGames(recentGamesRes.data);
      } catch (err) {
        setError('Failed to load your games');
        console.error('Error fetching user games:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserGames();
    }
  }, [id]);

  const openGameModal = (game) => {
    setSelectedGame(game);
  };

  const closeGameModal = () => {
    setSelectedGame(null);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <span>Loading your games...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {username}!</h1>
        <p>Track your progress and review your best games</p>
        <Link to="/game" className="btn btn-accent">
          Play New Game
        </Link>
      </div>

      <div className="dashboard-content">
        <div className="games-section">
          <div className="section-card glass-card">
            <h2>🏆 Top 5 High Scores</h2>
            {highScores.length > 0 ? (
              <div className="games-list">
                {highScores.map((game, index) => (
                  <div key={game.id} className="game-item">
                    <div className="game-rank">#{index + 1}</div>
                    <div className="game-info">
                      <div className="game-score">{game.totalScore.toLocaleString()}</div>
                      <div className="game-meta">
                        <span>Avg: {game.averageScore.toLocaleString()}</span>
                        <span>•</span>
                        <span>{new Date(game.completedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button 
                      className="btn btn-primary view-btn"
                      onClick={() => openGameModal(game)}
                    >
                      View Game
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-games">
                <p>No games played yet!</p>
                <Link to="/game" className="btn btn-accent">
                  Play Your First Game
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="games-section">
          <div className="section-card glass-card">
            <h2>📅 Recent Games</h2>
            {recentGames.length > 0 ? (
              <div className="games-list">
                {recentGames.map((game) => (
                  <div key={game.id} className="game-item">
                    <div className="game-date">
                      {new Date(game.completedAt).toLocaleDateString()}
                    </div>
                    <div className="game-info">
                      <div className="game-score">{game.totalScore.toLocaleString()}</div>
                      <div className="game-meta">
                        <span>Best: {game.bestRound.toLocaleString()}</span>
                        <span>•</span>
                        <span>Worst: {game.worstRound.toLocaleString()}</span>
                      </div>
                    </div>
                    <button 
                      className="btn btn-primary view-btn"
                      onClick={() => openGameModal(game)}
                    >
                      View Game
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-games">
                <p>No recent games!</p>
                <Link to="/game" className="btn btn-accent">
                  Start Playing
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedGame && (
        <GameSummaryModal 
          game={selectedGame} 
          onClose={closeGameModal} 
        />
      )}
    </div>
  );
};

export default UserDashboard;