const convertToArray = async (log) => {
  const raceTurns = []

  //Split each line into an array
  const logSplited = log.split('\n')

  //Removing first line
  logSplited.shift()

  //Mounting the object according to the log template
  logSplited.forEach((line) => {
    const turnData = line.trim().split(/\s+/)
    const turn = {}

    turnData.forEach((data, idx) => {
      switch (idx) {
        case 0:
          turn.time = data
          break
        case 1:
          turn.pilotCode = data
          break
        case 3:
          turn.pilot = data
          break
        case 4:
          turn.turn = data
          break
        case 5:
          turn.turnTime = data
          break
        case 6:
          turn.turnAverageSpeed = data
          break
      }
    })
    raceTurns.push(turn)
  })

  //Filter empty line
  return raceTurns.filter((r) => r.time && r.time != '')
}

const getPilots = (raceTurns) => {
  const racePilots = raceTurns.map((line) => line.pilotCode)
  return racePilots
    .filter((v, i, a) => a.indexOf(v) === i)
    .filter((r) => r != null)
}

const getPosition = (pilots) => {
  const positionList = pilots
    .map((p) => parseInt(p.totalRaceTime.replace('.', '').replace(':', '')))
    .sort()
  const pilotsPosition = pilots.map((p) => {
    const position = positionList.indexOf(
      parseInt(p.totalRaceTime.replace('.', '').replace(':', ''))
    )
    return {
      position: position + 1,
      ...p,
    }
  })
  return pilotsPosition.sort(compareToSort)
}

const compareToSort = (x, y) => {
  if (x.position < y.position) {
    return -1
  }
  if (x.position > y.position) {
    return 1
  }
  return 0
}

const getAverageSpeed = (pilotTurns, turnQuantity) => {
  const averageSpeed =
    pilotTurns.reduce(
      (speedTotal, turn) =>
        speedTotal + parseFloat(turn.turnAverageSpeed.replace(',', '.')),
      0
    ) / turnQuantity
  return averageSpeed
    .toFixed(3)
    .toString()
    .replace('.', ',')
}

module.exports = {
  convertToArray,
  getPilots,
  getPosition,
  getAverageSpeed
}
