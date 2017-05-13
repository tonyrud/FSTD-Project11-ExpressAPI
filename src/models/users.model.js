const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
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

