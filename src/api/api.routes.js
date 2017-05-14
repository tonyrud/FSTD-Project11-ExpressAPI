var express = require('express')
var router = express.Router()
const apiUsers = require('./api.users')
const apiCourses = require('./api.courses')
const Course = require('./../models/models').Course

// Users endpoints
router.get('/users', apiUsers.getUsers)
router.post('/users', apiUsers.createUser)

// Courses endpoints
router.get('/courses', apiCourses.getCourses)
router.get('/courses/:courseId', apiCourses.getCourses)
// router.post('/courses', apiCourses.createCourse)

// handler for req parameters
router.param('courseId', apiCourses.findCourse)

module.exports = router
