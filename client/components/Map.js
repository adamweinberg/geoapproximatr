import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";
import guessMarker from "../../public/guess-marker.png";
import { submitGuess } from "../store/guess";
import Loader from "react-loader-spinner";

const Map = (props) => {
  const { API_KEY, activeStep } = props;

  const dispatch = useDispatch();
  const { location } = useSelector((state) => state);

  const [guess, setGuess] = useState({ latitude: null, longitude: null });

  const guessRef = useRef(guess);

  const defaultProps = {
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 2,
  };

  const placeMarker = (event) => {
    const newGuess = { latitude: event.lat, longitude: event.lng };
    setGuess(newGuess);
    // Also immediately update the global state so other components can see it
    dispatch(submitGuess(newGuess));
  };

  useEffect(() => {
    guessRef.current = guess;
  });

  useEffect(() => {
    return () => dispatch(submitGuess(guessRef.current)); //put guess onto global state when component unmounts
  }, []);

  return (
    <div id="map-container">
      {!location.latitude && activeStep===1 ? ( //show spinner on first round to prevent invisible map
        <div id="loader">
          <Loader type="Circles" color="#3649BD" height={100} width={100} />
        </div>
      ) : (
        <div className="map-content">
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
              height="35px"
              width="35px"
              style={{ 
                transform: "translate(-17px, -35px)",
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))"
              }}
            />
          </GoogleMapReact>
        </div>
      )}
    </div>
  );
};

export default Map;
