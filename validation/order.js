const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateOrderInput (data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.brand = !isEmpty(data.brand) ? data.brand : ''
  data.quantity = !isEmpty(data.quantity) ? data.quantity : ''
  data.description = !isEmpty(data.description) ? data.description : ''
  data.price = !isEmpty(data.price) ? data.price : ''
  data.category = !isEmpty(data.category) ? data.category : ''

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be betwen 2 and 30 characters'
  }

  if (!Validator.isLength(data.description, { min: 5, max: 30 })) {
    errors.description = 'Too short'
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required'
  }
  if (Validator.isEmpty(data.brand)) {
    errors.brand = 'Brand field is required'
  }
  if (Validator.isEmpty(data.quantity)) {
    errors.quantity = 'Enter pieces amount'
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description field is required'
  }
  if (Validator.isEmpty(data.price)) {
    errors.price = 'Enter Price Amount'
  }
  if (Validator.isEmpty(data.category)) {
    errors.category = 'Pick a category'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
