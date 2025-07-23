import React, { useEffect, useRef } from "react";
import GoogleMapReact from "google-map-react";
import guessMarker from "../../public/guess-marker.png";
import locationMarker from "../../public/location-marker.png";
import { calculateMidpoint, getZoomLevel } from "../../script/calcs";

const ResultMap = (props) => {
  const { location, guess, distance } = props;
  const key = process.env.REACT_APP_API_KEY;
  const mapRef = useRef(null);
  const mapsRef = useRef(null);

  const midpoint = calculateMidpoint(guess, location);

  let zoom;
  if (guess.latitude !== null && guess.longitude !== null) {
    zoom = getZoomLevel(guess, location, { height: 600, width: screen.width });
  }

  let defaultProps = {
    center: {
      lat: midpoint.latitude,
      lng: midpoint.longitude,
    },
    zoom: zoom
  };

  const handleApiLoaded = (map, maps) => {
    mapRef.current = map;
    mapsRef.current = maps;
    
    // Draw line between guess and actual location
    if (guess.latitude !== null && guess.longitude !== null && location.latitude && location.longitude) {
      const lineCoordinates = [
        { lat: guess.latitude, lng: guess.longitude },
        { lat: location.latitude, lng: location.longitude }
      ];

      const line = new maps.Polyline({
        path: lineCoordinates,
        geodesic: true,
        strokeColor: '#FF6B6B',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        icons: [{
          icon: {
            path: 'M 0,-1 0,1',
            strokeOpacity: 1,
            scale: 2
          },
          offset: '0',
          repeat: '10px'
        }]
      });

      line.setMap(map);
    }
  };

  return (
    <div className="result-map-container">
      {!isNaN(defaultProps.zoom) ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: key }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <img
            src={guessMarker}
            lat={guess.latitude}
            lng={guess.longitude}
            height="35px"
            width="35px"
            style={{ 
              transform: "translate(-17px, -35px)",
              filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))",
              zIndex: 10
            }}
          />
          <img
            src={locationMarker}
            lat={location.latitude}
            lng={location.longitude}
            height="32px"
            width="21px"
            style={{ 
              transform: "translate(-10px, -32px)",
              filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))",
              zIndex: 10
            }}
          />
        </GoogleMapReact>
      ) : (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <span>Loading map...</span>
        </div>
      )}
    </div>
  );
};

export default ResultMap;
