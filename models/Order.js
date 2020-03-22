const mongoose = require('mongoose')

const Schema = mongoose.Schema

//Create Schema
const OrderSchema = new Schema({
  name: {
    type: String
  },
  quantity: {
    type: String
  },
  brand: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: String
  },
  total: {
    type: Number
  },
  category: {
    type: String
  },
  image: {
    type: String
  },
  createdAt: {
    type : Date, 
    default: Date.now
  },
  updatedAt: {
    type : Date, 
    default: Date.now
  }
})

module.exports = Order = mongoose.model('orders', OrderSchema)
