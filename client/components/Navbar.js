import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isGamePage}) => (
  <nav className={`glass ${isGamePage ? 'game-navbar' : ''}`}>
    <div className="nav-content">
      <Link to="/" className="logo">
        {isGamePage ? 'GA' : 'GeoApproximatr'}
      </Link>
      <div className="nav-links">
        <Link to="/leaderboard">Leaderboard</Link>
        {isLoggedIn ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <button 
              onClick={handleClick}
              className="btn btn-secondary"
              style={{padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--font-size-sm)'}}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="btn btn-primary" style={{padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--font-size-sm)'}}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
