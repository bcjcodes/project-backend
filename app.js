const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
require('dotenv').config()
const users = require('./routes/api/users')
const orders = require('./routes/api/orders')
const app = express()
const cors = require('cors')
const fileUpload = require('express-fileupload')

//Initialized Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//DB Config
const db = process.env.MONGO_URI

//Connect MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err))

//Passport middleware
app.use(passport.initialize())

//Passport Config
require('./config/passport')(passport)

// allow cors access
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200
  })
)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

// Setup express fileupload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
  })
)

//Use Routes
app.use('/api/orders', orders)
app.use('/api/users', users)

const port = process.env.PORT

app.listen(port, () => console.log(`Server is listening on port ${port}`))
