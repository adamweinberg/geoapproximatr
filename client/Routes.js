import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {me} from './store'
import Game from './components/Game'
import UserDashboard from './components/UserDashboard'
import GlobalHighScores from './components/GlobalHighScores'
import Account from './components/Account'
import Navbar from './components/Navbar'

/**
 * COMPONENT
 */
const Routes = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { id: isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(me())
  }, [dispatch])

  // Show navbar everywhere, but make it less obtrusive during games
  const isGamePage = location.pathname.startsWith('/game')

  return (
    <div className={isGamePage ? 'with-navbar' : ''}>
      <Navbar isGamePage={isGamePage} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/login">
          {isLoggedIn ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route path="/signup">
          {isLoggedIn ? <Redirect to="/dashboard" /> : <Signup />}
        </Route>
        <Route path="/dashboard">
          {isLoggedIn ? <UserDashboard /> : <Redirect to="/login" />}
        </Route>
        <Route path="/account">
          {isLoggedIn ? <Account /> : <Redirect to="/login" />}
        </Route>
        <Route path="/leaderboard">
          <GlobalHighScores />
        </Route>
      </Switch>
    </div>
  )
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default Routes
