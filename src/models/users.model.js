const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

var UserSchema = new Schema({
  fullName: {type: String, required: [true, 'Name is required.']},
  emailAddress: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required.'
  },
  password: {type: String, required: [true, 'Password is required.']}
})

// hash password
UserSchema.pre('save', function (next) {
  var user = this
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})

module.exports = UserSchema
