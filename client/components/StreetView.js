import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoogleStreetview from "react-google-streetview";
import { getLocation } from "../store/location";
import Loader from "react-loader-spinner";

const StreetView = (props) => {
  const { API_KEY } = props

  const dispatch = useDispatch();
  const { location } = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        await dispatch(getLocation());
      } catch (error) {
        console.error('Failed to get location:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, [dispatch, retryCount]);

  const handleRetry = () => {
    if (retryCount < 3) {
      setRetryCount(prev => prev + 1);
    }
  };

  const handleStreetViewError = (error) => {
    console.error('StreetView error:', error);
    setHasError(true);
  };

  const panoramaOptions = {
    position: {
      lat: location.latitude,
      lng: location.longitude,
    },
    addressControl: false,
    showRoadLabels: false,
    zoom: 0,
    fullscreenControl: false,
    // Add error handling options
    clickToGo: true,
    scrollwheel: true,
    // Ensure we have a valid position
    ...(location.latitude && location.longitude && {
      position: {
        lat: parseFloat(location.latitude),
        lng: parseFloat(location.longitude),
      }
    })
  };

  return (
    <div id="sv-container">
      {isLoading || !location.latitude ? (
        <div id="loader">
          <Loader type="Puff" color="#3649BD" height={100} width={100} />
          {isLoading && <p style={{color: 'white', marginTop: '10px', marginLeft: '10px', fontFamily: 'var(--font-family)'}}>Loading Location...</p>}
        </div>
      ) : hasError ? (
        <div id="streetview-error" style={{
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          height: '100%',
          color: 'white',
          textAlign: 'center',
          padding: '20px'
        }}>
          <p>Street View failed to load</p>
          <p style={{fontSize: '14px', opacity: 0.8}}>
            This location might not have Street View coverage
          </p>
          {retryCount < 3 && (
            <button 
              onClick={handleRetry}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#3649BD',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Try New Location (Attempt {retryCount + 1}/3)
            </button>
          )}
        </div>
      ) : (
        <GoogleStreetview
          apiKey={API_KEY}
          streetViewPanoramaOptions={panoramaOptions}
          onErrorFunc={handleStreetViewError}
        />
      )}
    </div>
  );
};

export default StreetView;
