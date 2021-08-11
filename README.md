# GeoApproximatr

![logo](https://user-images.githubusercontent.com/54007795/128434212-9c7b35db-1308-414c-b8ad-05443825846e.png)


GeoApproximatr is a clone of the game [Geoguessr](http://geoguessr.com), where a player is given a random Google Streetview location and they must guess where the location is on a map. Points are awarded based on how close the player's guess is to the actual location.

Below are a few screenshots and gifs from the game.

Game screen:
![image](https://user-images.githubusercontent.com/54007795/128434065-73e2a517-5d03-4bf0-9011-80a5f2aa46cc.png)

Round result:
![image](https://user-images.githubusercontent.com/54007795/128434118-00a21ede-e2fd-4c0c-b5b4-b0d37e5ca252.png)

Game result:
![image](https://user-images.githubusercontent.com/54007795/128434166-608a065c-3429-4f9f-86c0-4b1d49b1d0c5.png)

## Setup Instructions

### Installation
git clone the repository. Then, from the command line, run
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
- [google-map-react](https://www.npmjs.com/package/google-map-react)
- [react-google-streetview](https://www.npmjs.com/package/react-google-streetview)
- [random-streetview](https://www.npmjs.com/package/random-streetview)
- [react-loader-spinner](https://www.npmjs.com/package/react-loader-spinner)

## Contributors
- [Adam Weinberg](https://github.com/adamweinberg)

## Future Updates
In the relatively-near future, I'm planning on adding some more features to GeoApproximatr, including:
- User account creation (much of the backend code needed for this is already in the repository - I just need to integrate it!)
- Global and user-level high scores
- Improved display for all screen sizes
