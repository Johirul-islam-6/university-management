import mongoose from 'mongoose'
import config from './config'
import app from './app'
import { errorLogger, logger } from './shared/logger'

// database connected
async function DataBase() {
  try {
    await mongoose.connect(config.databaser_url as string)
    logger.info('📚 Database connected | All Ok')
    app.listen(config.port, () => {
      logger.info(`Run Time listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(`Database Connected fail ::`, error)
  }
}

DataBase()
