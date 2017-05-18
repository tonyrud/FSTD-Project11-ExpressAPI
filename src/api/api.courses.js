const Course = require('./../models/models').Course
const middleWare = require('./../middleware/')

function getCourses (req, res, next) {
  if (req.course) {
    middleWare.onSuccess(res, req.course, 201)
  } else {
    Course.find({}).select('_id title')
      .then(data => {
        middleWare.onSuccess(res, data, 200)
      })
      .catch(err => {
        const errMsg = 'in GET courses '
        middleWare.onError(res, errMsg, err)
      })
  }
}

function createCourse (req, res, next) {
  var course = new Course(req.body)
  course.save()
    .then(course => {
      middleWare.onSuccessPost(res, course, 201)
    })
    .catch(err => {
      // check if error is a validation error
      if (err.name === 'ValidationError') {
        // loop through error array and add to validationMsgs
        err.validationMsgs = middleWare.buildErrArray(err)
      }
      const errMsg = 'in POST create course '
      middleWare.onError(res, errMsg, err, next)
    })
}

// handler for req parameters
function findCourse (req, res, next, id) {
  Course.findById(id)
    .populate('user reviews')
    .then(doc => {
      req.course = doc
      return next()
    })
    .catch(err => {
      const errMsg = 'in GET single course '
      middleWare.onError(res, errMsg, err, next)
    })
}

// handler for req parameters
function updateCourse (req, res, next, id) {
  Course.findById(id)
    .populate('user reviews')
    .then(doc => {
      req.course = doc
      return next()
    })
    .catch(err => {
      const errMsg = 'in GET single course '
      middleWare.onError(res, errMsg, err, next)
    })
}

module.exports.getCourses = getCourses
module.exports.findCourse = findCourse
module.exports.createCourse = createCourse
module.exports.updateCourse = updateCourse


