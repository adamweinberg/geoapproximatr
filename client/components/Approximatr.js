import React from 'react'
import StreetView from "./StreetView";
import Map from "./Map";

const Approximatr = () => {

  return (
    <div id="approximatr-container">
      <div id="round-info">
        <p>Round: </p>
        <p>Score: </p>
      </div>
      <StreetView />
      <div id="map-and-buttons">
        <button>Return to Start</button>
        <Map />
      </div>
    </div>
  );
};

export default Approximatr;
