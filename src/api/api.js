var express = require('express')
var router = express.Router()
const apiUsers = require('./users')
const apiCourses = require('./courses')
const authenticate = require('./../middleware/index').authenticate

// Users endpoints
router.get('/users', authenticate, apiUsers.getUsers)
router.post('/users', apiUsers.createUser)

// Courses endpoints
router.get('/courses', apiCourses.getCourses)
router.get('/courses/:courseId', apiCourses.getCourses)
router.post('/courses', authenticate, apiCourses.createCourse)
router.put('/courses/:courseId', authenticate, apiCourses.updateCourse)

router.post('/courses/:courseId/reviews', authenticate, apiCourses.createReview)
// handler for req parameters
router.param('courseId', apiCourses.findCourse)

module.exports = router
