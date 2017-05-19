const Course = require('./../models/models').Course
const Review = require('./../models/models').Review
const middleWare = require('./../middleware/')

function getCourses (req, res, next) {
  // check if single course has been found
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
      if (!doc) {
        const err = new Error('Document id not found')
        const errMsg = 'in find course by id '
        middleWare.onError(res, errMsg, err, next)
      } else {
        req.course = doc
        return next()
      }
    })
    .catch(err => {
      const errMsg = 'in GET single course '
      middleWare.onError(res, errMsg, err, next)
    })
}

// handler for updating a course with put request
function updateCourse (req, res, next) {
  // req.course attached via params route findCourse()
  req.course.update(req.body)
  .then(course => {
    middleWare.onSuccessPost(res, course, 204)
  })
  .catch(err => {
    const errMsg = 'in POST create course '
    middleWare.onError(res, errMsg, err, next)
  })
}

// handler for posting a review
function createReview (req, res, next) {
  // create new review from request body, with user id
  const newReview = {
    user: req.course.user._id,
    rating: req.body.rating
  }
  var review = new Review(newReview)
  req.course.reviews.push(review)
  const savePromises = [req.course.save(review), review.save()]
  Promise.all(savePromises)
    .then(data => {
      middleWare.onSuccessPost(res, data, 201, req)
    })
    .catch(err => {
      // check if error is a validation error
      if (err.name === 'ValidationError') {
        // loop through error array and add to validationMsgs
        err.validationMsgs = middleWare.buildErrArray(err)
      }
      const errMsg = 'in POST create review '
      middleWare.onError(res, errMsg, err, next)
    })
}

module.exports.getCourses = getCourses
module.exports.findCourse = findCourse
module.exports.createCourse = createCourse
module.exports.updateCourse = updateCourse
module.exports.createReview = createReview


