const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const models = require('./models')

var UserSchema = new Schema({
  fullName: {type: String, required: [true, 'Name is required.']},
  emailAddress: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required.',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {type: String, required: [true, 'Password is required.']}
})

UserSchema.statics.authenticate = function (email, password, callback) {
  models.User.findOne({emailAddress: email})
    .then(user => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          return callback(null, user)
        } else {
          return callback(err)
        }
      })
    })
    .catch(err => {
      if (err) {
        return callback(err)
      } else if (!user) {
        err = new Error('User not found.')
        err.status = 401
        return callback(err)
      }
    })
}

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
