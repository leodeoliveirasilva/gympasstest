const express = require('express')
const bodyParser = require('body-parser')
const race_routes = require('./race')
const { config } = require('../config')

function initApp() {
  const app = express()

  const cors = require('cors')
  app.use(cors({ origin: '*' }))

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use('/race', race_routes)

  return app
}

module.exports = {
  initApp,
}
