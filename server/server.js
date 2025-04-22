import express from 'express'
import bodyParser from 'body-parser'
import VerifyRouter from './routes/verify.js'


const app = express()
app.use(bodyParser.json())

const PORT = process.env.PORT || 4000

// Import Routes
app.use('/', VerifyRouter)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${port}`)
})