import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import morgan from 'morgan'
import routes from './routes.js'

dotenv.config()

const dbString = process.env.DB_URL

mongoose.connect(dbString)
const db = mongoose.connection

db.on('error', (error) => {
  console.log(error)
})

db.once('open', () => {
  console.log('Connected to database')
})

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', routes)

app.listen(3000, () => {
  console.log('Listening server on port 3000')
})
