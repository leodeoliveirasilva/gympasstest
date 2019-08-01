const express = require('express')
const { log4js } = require('../config')
const { logReader } = require('../work')

const logger = log4js.getLogger('race route')
const router = express.Router()

router.get('/result/test', async (req, res) => {
  try {
    logger.info('/result/test - GET', 'BEGINNING')
    const result = await logReader.processLocalLog()
    logger.info('/result/test - GET', 'ENDING')
    res.status(200).json({
      body: result,
      success: true
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      errMessage: err.message
    })
    logger.error('/result/test - GET', err)
    logger.info('/result/test - GET', 'ENDING')
  }
})

router.post('/result', async (req, res) => {
  try {
    logger.info('/result - POST', 'BEGINNING')
    let logData
    if (req.body.logData) {
      logData = req.body.logData
    } else {
      logger.info('/result - POST', 'ENDING')
      res.status(400).send()
    }
    const result = await logReader.process(logData)
    res.status(200).json({
      body: result,
      success: true
    })
    logger.info('/result - POST', 'ENDING')
  } catch (err) {
    res.status(500).json({
      success: false,
      errMessage: err.message
    })
    logger.error('/result - POST', err)
    logger.info('/result - POST', 'ENDING')
  }
})

module.exports = router
