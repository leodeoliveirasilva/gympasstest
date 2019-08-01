const convertToArray = async (log) => {
  const raceTurns = []
  const logSplited = log.split('\n')
  logSplited.shift()

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
  return raceTurns.filter(r => r.time && r.time != '')
}

module.exports = {
  convertToArray
}
