export const timeString = (minutes) => {
  // Handle NaN, null, undefined, or non-numeric values
  if (
    minutes === null ||
    minutes === undefined ||
    isNaN(minutes) ||
    typeof minutes !== "number"
  ) {
    return null
  }

  if (minutes < 60) return `${minutes} minutes`
  const hours = Math.floor(minutes / 60)
  const minutesRemaining = minutes % 60

  if (minutesRemaining === 0) {
    return hours === 1 ? "1 hour" : `${hours} hours`
  }

  const hoursText = hours === 1 ? "1 hour" : `${hours} hours`
  const minutesText =
    minutesRemaining === 1 ? "1 minute" : `${minutesRemaining} minutes`
  return `${hoursText} and ${minutesText}`
}

export const checkDistances = (distances, distance) => {
  if (!distances[0] && distance <= 1) return false
  if (!distances[1] && distance > 1 && distance < 5) return false
  if (!distances[2] && distance >= 5 && distance <= 10) return false
  if (!distances[3] && distance > 10) return false
  return true
}
