import React, { useState, useEffect } from "react";

const RoundSlideshow = ({ rounds }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [polyline, setPolyline] = useState(null);

  const nextRound = () => {
    if (currentRound < rounds.length - 1) {
      setCurrentRound(currentRound + 1);
    }
  };

  const prevRound = () => {
    if (currentRound > 0) {
      setCurrentRound(currentRound - 1);
    }
  };

  const goToRound = (index) => {
    setCurrentRound(index);
  };

  useEffect(() => {
    if (window.google && window.google.maps && rounds.length > 0) {
      const mapElement = document.getElementById("slideshow-map");
      if (mapElement) {
        const newMap = new window.google.maps.Map(mapElement, {
          zoom: 2,
          center: { lat: 0, lng: 0 },
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          zoomControl: true,
          styles: [
            {
              featureType: "all",
              elementType: "labels",
              stylers: [{ visibility: "on" }]
            }
          ]
        });
        setMap(newMap);
      }
    }
  }, [rounds]);

  useEffect(() => {
    if (map && rounds.length > 0 && rounds[currentRound]) {
      const round = rounds[currentRound];
      
      // Debug logging
      console.log(`Round ${currentRound + 1} data:`, {
        location: round.location,
        guess: round.guess,
        distance: round.distance,
        score: round.score
      });
      
      // Clear existing markers and polyline
      markers.forEach(marker => marker.setMap(null));
      if (polyline) {
        polyline.setMap(null);
      }

      const newMarkers = [];

      // Add actual location marker (red)
      if (round.location && round.location.latitude && round.location.longitude) {
        const actualMarker = new window.google.maps.Marker({
          position: { lat: round.location.latitude, lng: round.location.longitude },
          map: map,
          title: "Actual Location",
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new window.google.maps.Size(40, 40)
          }
        });
        newMarkers.push(actualMarker);
      }

      // Add guess marker (blue)
      if (round.guess && round.guess.latitude && round.guess.longitude) {
        const guessMarker = new window.google.maps.Marker({
          position: { lat: round.guess.latitude, lng: round.guess.longitude },
          map: map,
          title: "Your Guess",
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            scaledSize: new window.google.maps.Size(40, 40)
          }
        });
        newMarkers.push(guessMarker);
      }

      // Add connecting line
      if (round.location && round.guess && 
          round.location.latitude && round.location.longitude &&
          round.guess.latitude && round.guess.longitude) {
        const line = new window.google.maps.Polyline({
          path: [
            { lat: round.guess.latitude, lng: round.guess.longitude },
            { lat: round.location.latitude, lng: round.location.longitude }
          ],
          geodesic: true,
          strokeColor: "#FF6B6B",
          strokeOpacity: 0.8,
          strokeWeight: 3,
          map: map
        });
        setPolyline(line);
      }

      setMarkers(newMarkers);

      // Fit bounds to show both markers
      if (newMarkers.length === 2) {
        const bounds = new window.google.maps.LatLngBounds();
        newMarkers.forEach(marker => bounds.extend(marker.getPosition()));
        map.fitBounds(bounds);
        
        // Add some padding
        const listener = window.google.maps.event.addListenerOnce(map, "idle", () => {
          if (map.getZoom() > 15) {
            map.setZoom(15);
          }
        });
      }
    }
  }, [map, currentRound, rounds]);

  if (!rounds || rounds.length === 0) {
    return (
      <div className="slideshow-container">
        <div className="no-data-message">
          <p>No round data available for slideshow</p>
        </div>
      </div>
    );
  }

  const round = rounds[currentRound];

  return (
    <div className="slideshow-container">
      <div className="slideshow-header">
        <h3>Round {currentRound + 1} of {rounds.length}</h3>
        <div className="round-stats">
          {round && (
            <>
              <span className="stat">
                Distance: {round.distance ? Math.round(round.distance).toLocaleString() : 'N/A'} miles
              </span>
              <span className="stat-divider">•</span>
              <span className="stat">
                Score: {round.score ? Math.round(round.score).toLocaleString() : 'N/A'} points
              </span>
            </>
          )}
        </div>
      </div>

      <div className="slideshow-map-container">
        <div id="slideshow-map" className="slideshow-map"></div>
      </div>

      <div className="slideshow-controls">
        <button 
          className="nav-btn prev-btn" 
          onClick={prevRound}
          disabled={currentRound === 0}
        >
          ← Previous
        </button>

        <div className="round-indicators">
          {rounds.map((_, index) => (
            <button
              key={index}
              className={`round-dot ${index === currentRound ? 'active' : ''}`}
              onClick={() => goToRound(index)}
              title={`Go to Round ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button 
          className="nav-btn next-btn" 
          onClick={nextRound}
          disabled={currentRound === rounds.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default RoundSlideshow;