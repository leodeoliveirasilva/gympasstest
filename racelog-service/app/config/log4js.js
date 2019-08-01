const log4js = require('log4js')
const config = require('./config')

function getLogger(moduleName) {
  const logger = log4js.getLogger(moduleName)
  // off|trace|debug|info|warn|error|fatal
  logger.level = config.logLevel
  return logger
}

module.exports = {
  getLogger
}
