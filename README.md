# GeoApproximatr

GeoApproximatr is a clone of the game [Geoguessr](http://geoguessr.com), where a player is given a random Google Streetview location and they must guess where the location is on a map. Points are awarded based on how close the player's guess is to the actual location.

Below are a few screenshots and gifs from the game.

## Setup Instructions

### Installation
git clone the repository. Then, from the command line, run:
`npm install`

### API Key
This application requires the [Google Maps JavaScript API key](https://developers.google.com/maps/documentation/javascript/overview). Create your own API key by following the instructions [here](https://developers.google.com/maps/documentation/javascript/get-api-key).

Once you have your API key, add it to the `key` variable found in /script/key.js

![image](https://user-images.githubusercontent.com/54007795/128431645-dfdf258b-dd57-4b51-9d8d-c04390b49165.png)

### Start the Server
From the command line, run `npm run start:dev`

Then, navigate to http://localhost:8080 in your browser. You should now be playing GeoApproximatr!

## Technologies and Libraries Used
- Node
- React
- Redux
- Google Maps API
- Material-UI
- react-google-map
- react-google-streetview
- react-loader-spinner
- random-streetview

## Contributors
- [Adam Weinberg](https://github.com/adamweinberg)
