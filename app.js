const express = require('express')
const bodyParser = require('body-parser')

const app = express()

//Call in the routes
const orders = require('./api/routes/order')

//BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Use Routes
app.use('api/orders', orders)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server is listening at port ${port}`))
