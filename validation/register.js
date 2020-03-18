const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateRegisterInput (data) {
  let errors = {}

  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : ''

  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = 'Password must be at least 8 characters'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Enter Password'
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm Password is required'
  }
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
