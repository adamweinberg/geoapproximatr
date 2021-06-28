export function calculateDistance(guess, location) {
  //calculate distance between two sets of coordinates using haversine formula. adapted from http://www.movable-type.co.uk/scripts/latlong.html

  const R = 6371; //radius of earth in km
  const dLat = deg2rad(location.latitude - guess.latitude);
  const dLon = deg2rad(location.longitude - guess.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(guess.latitude)) *
      Math.cos(deg2rad(location.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  let d = R * c; //distance in km
  d *= 0.621371; //distance in mi
  return d.toFixed(0);
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function calculateScore(guess, location) {
  let distance = calculateDistance(guess, location);
  distance = distance * 1.609

  //const zeroScoreDistance = 4000; //the maximum distance that allows for points to be awarded
  //let score = Math.pow(distance, 2) * (-1 / zeroScoreDistance) + 5000; //random quadratic function to calculate score. not too concerned about the scoring
  let score = 5000 * Math.pow(Math.E, ((-1 * distance) / 2000))
  score = Math.round(score); //round score to nearest integer
  if (score < 0) {
    score = 0; //dont allow negative scores
  }
  return score;
}

export function calculateMapZoom(guess, location) {
  //https://stackoverflow.com/questions/6048975/google-maps-v3-how-to-calculate-the-zoom-level-for-a-given-bounds
  const GLOBE_WIDTH = 256;
  let angle = guess.longitude - location.longitude;
  if (angle < 0) {
    angle += 360;
  }
  let zoom = Math.floor(Math.log((360 * 800) / angle / GLOBE_WIDTH) / Math.LN2);
  if (zoom === 2) {
    //just zoom out everything that's really far away
    zoom = 0;
  }
  return zoom;
}

export function calculateMidpoint(guess, location) {
  const midLat = (guess.latitude + location.latitude) / 2;
  const midLng = (guess.longitude + location.longitude) / 2;
  const midpoint = { latitude: midLat, longitude: midLng };
  return midpoint;
}

export function getZoomLevel(guess, location, mapDim) {
  var WORLD_DIM = { height: 256, width: 256 };
  var ZOOM_MAX = 21;

  // function latRad(lat) {
  //   var sin = Math.sin((lat * Math.PI) / 180);
  //   var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
  //   return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
  // }

  function zoom(mapPx, worldPx, fraction) {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
  }

  // let latFraction =
  //   (latRad(guess.latitude) - latRad(location.latitude)) / Math.PI;
  // if (latFraction < 0) {
  //   latFraction *= -1;
  // }

  let latDiff = Math.abs(guess.latitude - location.latitude)
  let latFraction = latDiff / 180;

  let lngDiff = Math.abs(guess.longitude - location.longitude);
  let lngFraction = lngDiff / 360;

  let latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
  let lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

  const zoomLevel = Math.min(latZoom, lngZoom, ZOOM_MAX);
  return zoomLevel;
}
