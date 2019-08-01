//Function to sum total race time
const sumMinutes = (initTime, timeString) => {
  const time = timeString.split(new RegExp('[-+()*/:.? ]', 'g'))
  initTime.add(time[0], 'minutes')
  initTime.add(time[1], 'seconds')
  initTime.add(time[2], 'milliseconds')
  return initTime
}

module.exports = {
  sumMinutes,
}
