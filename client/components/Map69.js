import React from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";

const Map = withScriptjs(
  withGoogleMap(() => {
    return (
      <GoogleMap
        defaultZoom={2}
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultOptions={{
          streetViewControl: false,
          fullScreenControl: false,
          mapTypeControl: false
          //gestureHandling: "none",
        }}
      />
    );
  })
);

const SimpleMap = () => {

  const API_KEY="AIzaSyDS1KQ2VDCVYv0pTJzcrRIN3xbWzzChJLg" //move this elsewhere

  const handleMapClick = (event) => {
    console.log(event.latLng)
  }

  return (
      <Map
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        onMapClick={handleMapClick}
      />
  );
};

export default SimpleMap;
