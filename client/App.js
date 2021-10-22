import React from 'react'
import Navbar from './components/Navbar'
import Routes from './Routes'

const App = () => {
  console.log(process.env)
  return (
    <div>
      <Routes />
    </div>
  )
}

export default App
