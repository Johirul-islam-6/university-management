import mongoose from 'mongoose'
import config from './config'
import app from './app'

// database connected
async function DataBase() {
  console.log(config.databaser_url)
  try {
    await mongoose.connect(config.databaser_url as string)
    console.log('📚 Database connected | All Ok')
    app.listen(config.port, () => {
      console.log(`Run Time listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(`Database Connected fail ::`, error)
  }
}

DataBase()
