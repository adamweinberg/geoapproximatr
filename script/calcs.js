export function calculateDistance(guess, location) { //calculate distance between two sets of coordinates using haversine formula. adapted from http://www.movable-type.co.uk/scripts/latlong.html
  console.log('guess', guess, 'location', location)

  const R = 6371 //radius of earth in km
  const dLat = deg2rad(location.latitude - guess.latitude)
  const dLon = deg2rad(location.longitude - guess.longitude)

  const a =
  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  Math.cos(deg2rad(guess.latitude)) * Math.cos(deg2rad(location.latitude)) *
  Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  let d = R * c //distance in km
  d *= .621371 //distance in mi
  return d.toFixed(0)
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}
