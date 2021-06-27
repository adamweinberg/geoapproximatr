import React from "react";
import { useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";
import guessMarker from "../../public/guess-marker.png";
import locationMarker from "../../public/location-marker.png";
import { calculateMidpoint, getZoomLevel } from "../../script/calcs";

const ResultMap = (props) => {
  const { location, guess } = props;

  const midpoint = calculateMidpoint(guess, location);

  let zoom;
  if (guess.latitude !== "") {
    //proabbly some excess safeguarding here. will refactor later
    zoom = getZoomLevel(guess, location, { height: 600, width: screen.width });
    console.log(zoom);
  }

  let defaultProps = {
    center: {
      lat: midpoint.latitude,
      lng: midpoint.longitude,
    },
    zoom: zoom - 1, //calculated zoom is sometimes too much, so just zoom out 1 extra level
  };

  const API_KEY = "AIzaSyDS1KQ2VDCVYv0pTJzcrRIN3xbWzzChJLg"; //move this elsewhere

  return (
    <div style={{ height: "600px", width: "100%" }}>
      {!isNaN(defaultProps.zoom) ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          yesIWantToUseGoogleMapApiInternals
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <img
            src={guessMarker}
            lat={guess.latitude}
            lng={guess.longitude}
            height="30px"
            width="30px"
            style={{ transform: "translate(-15px, -30px)" }}
          />
          <img
            src={locationMarker}
            lat={location.latitude}
            lng={location.longitude}
            height="27px"
            width="18px"
            style={{ transform: "translate(-9px, -27px)" }}
          />
        </GoogleMapReact>
      ) : (
        <span>loading</span>
      )}
    </div>
  );
};

export default ResultMap;
