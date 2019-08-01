const fs = require('fs')
const moment = require('moment')
const raceLogUtil = require('../util/race-log')
const datetime = require('../util/moment-datetime')

const filePath = 'app/logs/logkart.txt'

const processLocalLog = async () => {
  const logData = fs.readFileSync(filePath, 'utf-8')
  return await process(logData)
}

const process = async (logData) => {
  const raceTurns = await raceLogUtil.convertToArray(logData)
  const pilots = getPilots(raceTurns)

  let pilotsFormatted = pilots.map((p) => {
    const endTime = raceTurns.filter(
      (turn) => turn.pilotCode == p && turn.turn == '4'
    )
    const pilotTurns = raceTurns.filter((turn) => turn.pilotCode == p)
    let initTime = moment.utc('00:00:00.000', 'HH:mm:ss.SSS')
    const turnQuantity = Math.max.apply(
      null,
      pilotTurns.map((t) => parseInt(t.turn))
    )
    return {
      pilot: pilotTurns ? pilotTurns[0].pilot : '',
      pilotCode: p,
      raceEndTime: endTime.length > 0 ? endTime[0].time : '',
      totalRaceTime: pilotTurns
        .reduce(
          (prev, turn) => datetime.sumMinutes(prev, turn.turnTime),
          initTime
        )
        .format('mm:ss.SSS'),
      turnQuantity: turnQuantity,
      averageSpeed:
        (pilotTurns.reduce((speedTotal, turn) => speedTotal + parseFloat(turn.turnAverageSpeed.replace(',','.')), 0) /
        turnQuantity).toFixed(3).toString().replace('.',','),
      turns: pilotTurns.map((t) => {
        return {
          turn: t.turn,
          endTime: t.time,
          turnTime: t.turnTime,
          turnAverageSpeed: t.turnAverageSpeed,
        }
      }),
    }
  })
  return getPosition(pilotsFormatted)
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

const compareToSort = (a, b) => {
  if (a.position < b.position) {
    return -1
  }
  if (a.position > b.position) {
    return 1
  }
  return 0
}

module.exports = {
  process,
  processLocalLog
}
