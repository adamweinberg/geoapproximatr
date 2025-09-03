import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { User, Edit3, Save, X, Key, Trash2, GamepadIcon, AlertTriangle, Trophy } from 'lucide-react';
import { logout, me } from '../store';
import { getData } from 'country-list';
import axios from 'axios';

const Account = () => {
  const user = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    countryOfOrigin: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [gameCount, setGameCount] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        countryOfOrigin: user.countryOfOrigin || ''
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchGameCount = async () => {
      if (user.id) {
        try {
          const token = window.localStorage.getItem('token');
          const response = await axios.get('/api/users/stats', {
            headers: {
              authorization: token
            }
          });
          setGameCount(response.data.gameCount);
          setHighestScore(response.data.highestScore);
        } catch (error) {
          console.error('Failed to fetch game count:', error);
        }
      }
    };

    fetchGameCount();
  }, [user.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    // Frontend validation for required fields
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.countryOfOrigin.trim()) {
      setMessage({ 
        type: 'error', 
        text: 'First name, last name, and country of origin are required and cannot be empty' 
      });
      setLoading(false);
      return;
    }
    
    try {
      const token = window.localStorage.getItem('token');
      await axios.put('/api/users/profile', formData, {
        headers: {
          authorization: token
        }
      });
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
      
      // Refresh the auth state to show updated data
      dispatch(me());
      
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update profile' 
      });
    }
    
    setLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      countryOfOrigin: user.countryOfOrigin || ''
    });
    setIsEditing(false);
    setMessage({ type: '', text: '' });
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      const token = window.localStorage.getItem('token');
      await axios.delete('/api/users/account', {
        headers: {
          authorization: token
        }
      });
      
      // Log out the user after successful deletion
      dispatch(logout());
      
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to delete account' 
      });
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (!user.id) {
    return (
      <div className="account-container">
        <div className="auth-required">
          <h2>Please log in to view your account</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="account-header">
        <h1><User size={28} className="inline-icon" /> Account Settings</h1>
        <p>Manage your profile information</p>
      </div>

      <div className="account-content">
        {/* Profile Information Card */}
        <div className="account-card glass-card">
          <div className="card-header">
            <h2>Profile Information</h2>
            {!isEditing ? (
              <button 
                className="btn btn-secondary edit-btn"
                onClick={() => setIsEditing(true)}
              >
                <Edit3 size={16} /> Edit
              </button>
            ) : (
              <div className="edit-actions">
                <button 
                  className="btn btn-primary save-btn"
                  onClick={handleSave}
                  disabled={loading}
                >
                  <Save size={16} /> {loading ? 'Saving...' : 'Save'}
                </button>
                <button 
                  className="btn btn-secondary cancel-btn"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  <X size={16} /> Cancel
                </button>
              </div>
            )}
          </div>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="profile-form">
            <div className="form-group account-form-group">
              <label htmlFor="username">Username</label>
              <div className="form-display">{user.username || 'Not set'}</div>
            </div>

            <div className="form-group account-form-group">
              <label htmlFor="firstName">First Name</label>
              {isEditing ? (
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your first name"
                  required
                />
              ) : (
                <div className="form-display">{user.firstName || 'Not set'}</div>
              )}
            </div>

            <div className="form-group account-form-group">
              <label htmlFor="lastName">Last Name</label>
              {isEditing ? (
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your last name"
                  required
                />
              ) : (
                <div className="form-display">{user.lastName || 'Not set'}</div>
              )}
            </div>

            <div className="form-group account-form-group">
              <label htmlFor="countryOfOrigin">Country of Origin</label>
              {isEditing ? (
                <select
                  id="countryOfOrigin"
                  name="countryOfOrigin"
                  value={formData.countryOfOrigin}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Select your country</option>
                  {getData().map(country => (
                    <option key={country.code} value={country.name}>{country.name}</option>
                  ))}
                </select>
              ) : (
                <div className="form-display">{user.countryOfOrigin || 'Not set'}</div>
              )}
            </div>
          </div>
        </div>

        {/* Statistics Card */}
        <div className="account-card glass-card">
          <div className="card-header">
            <h2>Statistics</h2>
          </div>
          
          <div className="stats-display">
            <div className="stat-item">
              <GamepadIcon size={20} className="stat-icon" />
              <span className="stat-label">Games Completed:</span>
              <span className="stat-value">{gameCount}</span>
            </div>
            <div className="stat-item">
              <Trophy size={20} className="stat-icon" />
              <span className="stat-label">Highest Score:</span>
              <span className="stat-value">{highestScore.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Security & Settings Card */}
        <div className="account-card glass-card">
          <div className="card-header">
            <h2>Security & Settings</h2>
          </div>
          
          <div className="security-actions">
            <Link to="/change-password" className="btn btn-secondary security-btn">
              <Key size={16} /> Change Password
            </Link>
            
            {!showDeleteConfirm ? (
              <button 
                className="btn btn-danger delete-btn"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 size={16} /> Delete Account
              </button>
            ) : (
              <div className="delete-confirmation">
                <div className="warning-message">
                  <AlertTriangle size={20} />
                  <span>Are you sure you want to delete your account? This action cannot be undone.</span>
                </div>
                <div className="delete-actions">
                  <button 
                    className="btn btn-danger confirm-delete"
                    onClick={handleDeleteAccount}
                    disabled={deleting}
                  >
                    <Trash2 size={16} /> {deleting ? 'Deleting...' : 'Yes, Delete Account'}
                  </button>
                  <button 
                    className="btn btn-secondary cancel-delete"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={deleting}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;