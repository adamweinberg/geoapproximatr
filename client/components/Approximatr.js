import React from "react";
import StreetView from "./StreetView";
import Map from "./Map";

const Approximatr = () => {
  return (
    <div id='approximatr-container'>
      <div id="round-info">
        <p>Round: </p>
        <p>Score: </p>
        <StreetView />
        <div id="map-and-buttons">
          <button>Return to Start</button>
          {/* <Map
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          /> */}
        </div>
      </div>
    </div>
  )
}

export default Approximatr
