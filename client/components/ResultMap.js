import React from "react";
import GoogleMapReact from "google-map-react";
import guessMarker from "../../public/guess-marker.png";
import locationMarker from "../../public/location-marker.png";
import { calculateMidpoint, getZoomLevel } from "../../script/calcs";
import key from "../../script/key";

const ResultMap = (props) => {
  const { location, guess } = props;

  const midpoint = calculateMidpoint(guess, location);

  let zoom;
  if (guess.latitude !== "") {
    zoom = getZoomLevel(guess, location, { height: 600, width: screen.width });
  }

  let defaultProps = {
    center: {
      lat: midpoint.latitude,
      lng: midpoint.longitude,
    },
    zoom: zoom
  };

  return (
    <div style={{ height: "75vh", width: "100%" }}>
      {!isNaN(defaultProps.zoom) ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: key }}
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
