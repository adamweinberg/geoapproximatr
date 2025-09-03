import React, {useState, useEffect, useRef} from 'react'
import {connect} from 'react-redux'
import {Link, useLocation} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isGamePage, user}) => {
  const location = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  
  const getUserInitials = (user) => {
    if (!user.username) return 'U'
    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`
    }
    return user.username.charAt(0).toUpperCase()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  return (
    <nav className={`glass ${isGamePage ? 'game-navbar' : ''}`}>
      <div className="nav-content">
        <Link to="/" className="logo">
          {isGamePage ? 'GA' : 'GeoApproximatr'}
        </Link>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/leaderboard" className={location.pathname === '/leaderboard' ? 'active' : ''}>Leaderboard</Link>
          <Link to="/game" className="btn btn-primary new-game-btn">New Game</Link>
          {isLoggedIn ? (
            <div className="user-dropdown" ref={dropdownRef}>
              <button 
                className="user-avatar-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {getUserInitials(user)}
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link 
                    to="/dashboard" 
                    className={location.pathname === '/dashboard' ? 'active' : ''}
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/account" 
                    className={location.pathname === '/account' ? 'active' : ''}
                    onClick={() => setDropdownOpen(false)}
                  >
                    Account
                  </Link>
                  <button 
                    onClick={() => {
                      handleClick()
                      setDropdownOpen(false)
                    }}
                    className="dropdown-logout"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-secondary login-btn">Login</Link>
          )}
      </div>
    </div>
  </nav>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    user: state.auth
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
