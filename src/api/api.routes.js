var express = require('express')
var router = express.Router()
const apiUsers = require('./apiUsers')
const apiCourses = require('./apiCourses')
const Course = require('./../models/models').Course

// Users endpoints
router.get('/users', apiUsers.getUsers)
router.post('/users', apiUsers.createUser)

// Courses endpoints
router.get('/courses', apiCourses.getCourses)
router.get('/courses/:courseId', apiCourses.getCourses)
// router.post('/courses', apiCourses.createCourse)

// handler for req parameters
router.param('courseId', function (req, res, next, id) {
  Course.findById(id, function (err, doc) {
    if (err) return next(err)
    if (!doc) {
      err = new Error('Not Found')
      err.status = 404
      return next(err)
    }
    req.course = doc
    // console.log(req.question)
    return next()
  })
})

module.exports = router
