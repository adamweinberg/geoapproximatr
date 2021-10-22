import React from 'react'
import Navbar from './components/Navbar'
import Routes from './Routes'

const App = () => {
  console.log('hello', process.env.API_KEY)
  return (
    <div>
      <Routes />
    </div>
  )
}

export default App
