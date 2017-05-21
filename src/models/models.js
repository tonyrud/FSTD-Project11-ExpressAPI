const mongoose = require('mongoose')
// const Schema = mongoose.Schema
const UserSchema = require('./users')
const ReviewSchema = require('./reviews')
const CourseSchema = require('./courses')

module.exports.User = mongoose.model('User', UserSchema)
module.exports.Course = mongoose.model('Course', CourseSchema)
module.exports.Review = mongoose.model('Review', ReviewSchema)

