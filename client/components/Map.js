import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import GoogleMapReact from "google-map-react";
import guessMarker from "../../public/guess-marker.png";
import { submitGuess } from '../store/guess'

const Map = () => {
  const dispatch = useDispatch();

  const [guess, setGuess] = useState({ latitude: 0, longitude: 0 });

  const guessRef = useRef(guess)

  const defaultProps = {
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 2,
  };

  const API_KEY = "AIzaSyDS1KQ2VDCVYv0pTJzcrRIN3xbWzzChJLg"; //move this elsewhere

  const placeMarker = (event) => {
    setGuess({ latitude: event.lat, longitude: event.lng });
  };

  useEffect(() => {
    guessRef.current = guess
  })

  useEffect(() => {
    return () => dispatch(submitGuess(guessRef.current)) //put guess onto global state when component unmounts
  }, [])

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onClick={placeMarker}
      >
        <img
          src={guessMarker}
          lat={guess.latitude}
          lng={guess.longitude}
          height="30px"
          width="30px"
          style={{ transform: "translate(-15px, -30px)" }}
        />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
