import React from 'react'
import { Link } from "react-router-dom";
// import navigatingStreetview from '../../public/navigating-streetview.gif'
// import findingText from '../../public/finding-text.gif'
// import placingGuess from '../../public/placing-guess.gif'
// import savingGuess from '../../public/saving-guess.gif'
import { Button } from '@material-ui/core'

const Instructions = () => {
  return (
    <div id='instructions-container'>
      <h1>How to Play</h1>
      <h3>Welcome to GeoApproximatr, a clone of GeoGuessr</h3>
      <p>GeoApproximatr is a geography guessing game where a player is placed in a random location in Google Streetview. They then must guess their location by placing a pin on a map.</p>
      <p>Points are awarded for each guess based on how close it is to the actual location.</p>
      <p></p>
      <p>Explore the Streetview panorama to gather clues about your locatioin</p>
      {/* <img src={navigatingStreetview} /> */}
      <p>Tip - Look for signs with text!</p>
      {/* <img src={findingText} /> */}
      <p>Place your guess on the map. You can move the marker around as much as you like.</p>
      {/* <img src={placingGuess} /> */}
      <p>When you are happy with your guess, click Submit Guess.</p>
      <p>Points are awarded based on how close your guess is to the actual location. You can score up to 5000 points in each round. A game consists of 5 rounds.</p>
      {/* <img src={savingGuess} /> */}
      <p>Ready to play? Click Start Game to play!</p>
      <div id='instructions-buttons'>
        <Button id="start-game-button">
          <Link to="/game">Start Game</Link>
        </Button>
        <Button id='return-home'>
          <Link to='/'>Home</Link>
        </Button>
      </div>
    </div>
  )
}

export default Instructions
