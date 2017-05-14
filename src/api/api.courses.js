const Course = require('./../models/models').Course
const middleWare = require('./../middleware/')

function getCourses (req, res, next) {
  if (req.course) {
    middleWare.onSuccess(res, req.course, 201)
  } else {
    Course.find({})
      .then(data => {
        middleWare.onSuccess(res, data, 200)
      })
      .catch(err => {
        const errMsg = 'in GET courses '
        middleWare.onError(res, errMsg, err)
      })
  }
}

// function createCourse (req, res, next) {
//   if (req.course) {
//     requestHandler.onSuccess(res, req.course, 201)
//   } else {
//     Course.find({})
//       .then(data => {
//         requestHandler.onSuccess(res, data, 200)
//       })
//       .catch(err => {
//         const errMsg = 'in GET courses '
//         requestHandler.onError(res, errMsg, err)
//       })
//   }
// }

// handler for req parameters
function findCourse (req, res, next, id) {
  Course.findById(id)
    .then(doc => {
      req.course = doc
      return next()
    })
    .catch(err => {
        const errMsg = 'in GET single course '
        // middleWare.onError(res, errMsg, err)
        next(err)
      })
}

module.exports.getCourses = getCourses
module.exports.findCourse = findCourse
// module.exports.createCourse = createCourse


