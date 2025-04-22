import express from 'express'
import bodyParser from 'body-parser'
import VerifyRouter from './routes/verify.js'


const app = express()
app.use(bodyParser.json())

const PORT = 3000

// Import Routes
app.use('/', VerifyRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})