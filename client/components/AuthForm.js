import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="auth-container">
      <div className="auth-form glass-card">
        <h2>{displayName}</h2>
        <form onSubmit={handleSubmit} name={name}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input name="username" type="text" placeholder="Enter your username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input name="password" type="password" placeholder="Enter your password" required />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
              {displayName}
            </button>
          </div>
          {error && error.response && (
            <div style={{
              color: 'var(--secondary-gradient)',
              textAlign: 'center',
              marginTop: 'var(--space-4)',
              padding: 'var(--space-3)',
              backgroundColor: 'rgba(255, 87, 108, 0.1)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 87, 108, 0.3)'
            }}>
              {error.response.data}
            </div>
          )}
        </form>
        <div style={{
          textAlign: 'center',
          marginTop: 'var(--space-6)',
          paddingTop: 'var(--space-4)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {displayName === 'Login' ? (
            <p>
              Don't have an account?{' '}
              <Link to="/signup" style={{color: 'var(--primary-light)', fontWeight: '600'}}>
                Sign up here
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <Link to="/login" style={{color: 'var(--primary-light)', fontWeight: '600'}}>
                Login here
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
