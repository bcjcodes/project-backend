const mongoose = require('mongoose')

const Schema = mongoose.Schema

//Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
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
  }
})

module.exports = User = mongoose.model('users', UserSchema)
