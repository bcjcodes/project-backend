const mongoose = require('mongoose')

const Schema = mongoose.Schema

//Create Schema
const OrderSchema = new Schema({
  // product_id: {
  //   type: String,
  //   required: true
  // },
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
  },
  category: {
    type: String,
    required: true
  },
  contact: {
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
