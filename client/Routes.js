import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {me} from './store'
import Game from './components/Game'

/**
 * COMPONENT
 */
const Routes = () => {
  const dispatch = useDispatch()
  //const { id: isLoggedIn } = useSelector(state => state.auth)

  //useEffect(() => {
  //   dispatch(me())
  // }, [])

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Switch>
    </div>
  )
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default Routes
