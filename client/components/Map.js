import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";
import guessMarker from "../../public/guess-marker.png";
import { submitGuess } from "../store/guess";
import Loader from "react-loader-spinner";

const Map = (props) => {
  const { API_KEY } = props;

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
    setGuess({ latitude: event.lat, longitude: event.lng });
  };

  useEffect(() => {
    guessRef.current = guess;
  });

  useEffect(() => {
    return () => dispatch(submitGuess(guessRef.current)); //put guess onto global state when component unmounts
  }, []);

  return (
    <div style={{ height: "300px", width: "30%" }}>
      {!location.latitude ? (
        <div id="loader">
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Map;
