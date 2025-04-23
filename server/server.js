import express from 'express'
import bodyParser from 'body-parser'
import VerifyRouter from './routes/verify.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

// Import Routes
app.use('/', VerifyRouter)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Example app listening on port ${PORT}`)
})