const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const users = require('./routes/api/users')
const orders = require('./routes/api/orders')
const app = express()

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

app.get('/', (req, res) => {
  res.send('I love coding')
})

//Use Routes
app.use('/api/orders', orders)
app.use('/api/users', users)

const port = process.env.PORT

app.listen(port, () => console.log(`Server is listening on port ${port}`))
