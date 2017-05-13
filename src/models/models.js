const mongoose = require('mongoose')
// const Schema = mongoose.Schema
const UserSchema = require('./users.model')
const ReviewSchema = require('./reviews.model')
const CourseSchema = require('./courses.model')

module.exports.User = mongoose.model('User', UserSchema)
module.exports.Course = mongoose.model('Course', CourseSchema)
module.exports.Review = mongoose.model('Review', ReviewSchema)

