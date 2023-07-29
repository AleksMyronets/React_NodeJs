import connectMongo from './db/connect.js'

import app from './app.js'

const { PORT } = process.env;

const startServer = async () => {
  try {
    await connectMongo()
    app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`)
})
  } catch (error) {
    console.log (error)
  }
}

startServer();

// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`)
// })
