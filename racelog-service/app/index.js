const routes = require('./routes')
const { config, log4js } = require('./config')

const logger = log4js.getLogger('app')

try {
  const app = routes.initApp()
  app.listen(config.apiPort)
  logger.info(`Listening on port ${config.apiPort}`)
} catch (err) {
  logger.error(err)
}
