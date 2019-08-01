const fs = require('fs')
const moment = require('moment')
const raceLogUtil = require('../util/race-log')
const datetime = require('../util/moment-datetime')

//Read local file for test
const processLocalLog = async () => {
  const filePath = 'app/test-log/logkart.txt'
  const logData = fs.readFileSync(filePath, 'utf-8')
  return await process(logData)
}

//Main function to read the log file
const process = async (logData) => {
  //Read log file
  const raceTurns = await raceLogUtil.convertToArray(logData)
  //Get all the pilots
  const pilots = raceLogUtil.getPilots(raceTurns)

  //Processing information about all pilots and the race
  const raceInfoResult = pilots.map((pilotCode) => {
    const endTime = raceTurns.filter(
      (turn) => turn.pilotCode == pilotCode && turn.turn == '4'
    )
    const pilotTurns = raceTurns.filter((turn) => turn.pilotCode == pilotCode)
    const initTime = moment.utc('00:00:00.000', 'HH:mm:ss.SSS')
    const turnQuantity = Math.max.apply(
      null,
      pilotTurns.map((t) => parseInt(t.turn))
    )
    return {
      pilot: pilotTurns ? pilotTurns[0].pilot : '',
      pilotCode,
      raceEndTime: endTime.length > 0 ? endTime[0].time : '',
      totalRaceTime: pilotTurns
        .reduce(
          (prev, turn) => datetime.sumMinutes(prev, turn.turnTime),
          initTime
        )
        .format('mm:ss.SSS'),
      turnQuantity,
      averageSpeed: raceLogUtil.getAverageSpeed(pilotTurns, turnQuantity),
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
  //getting position of the pilots
  return raceLogUtil.getPosition(raceInfoResult)
}

module.exports = {
  process,
  processLocalLog,
}
