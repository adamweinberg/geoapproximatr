import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoogleStreetview from "react-google-streetview";
import { getLocation } from "../store/location";
import Loader from "react-loader-spinner";

const StreetView = (props) => {
  const { API_KEY } = props

  const dispatch = useDispatch();
  const { location } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getLocation());
  }, []);

  const panoramaOptions = {
    position: {
      lat: location.latitude,
      lng: location.longitude,
    },
    addressControl: false,
    showRoadLabels: false,
    zoom: 0,
    fullscreenControl: false,
  };

  return (
    <div id="sv-container">
      {!location.latitude ? (
        <div id="loader">
          <Loader type="Puff" color="#3649BD" height={100} width={100} />
        </div>
      ) : (
        <GoogleStreetview
          apiKey={API_KEY}
          streetViewPanoramaOptions={panoramaOptions}
        />
      )}
    </div>
  );
};

export default StreetView;
