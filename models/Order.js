const mongoose = require('mongoose')

const Schema = mongoose.Schema

//Create Schema
const OrderSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    requred: true
  },
  brand: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  }
})

module.exports = Order = mongoose.model('orders', OrderSchema)
