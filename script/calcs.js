export function calculateDistance(guess, location) { //calculate distance between two sets of coordinates using haversine formula. adapted from http://www.movable-type.co.uk/scripts/latlong.html

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

export function calculateScore(guess, location) {
  const distance = calculateDistance(guess, location)

  const zeroScoreDistance = 4000 //the maximum distance that allows for points to be awarded
  let score = Math.pow(distance, 2) * (-1 / zeroScoreDistance) + 5000 //random quadratic function to calculate score. not too concerned about the scoring
  score = Math.round(score) //round score to nearest integer
  if (score < 0) {
    score = 0 //dont allow negative scores
  }
  return score
}
