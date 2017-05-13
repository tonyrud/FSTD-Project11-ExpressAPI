const Course = require('./../models/models').Course
const requestHandler = require('./../middleware/requestHandlers')

function getCourses (req, res, next) {
  if (req.course) {
    requestHandler.onSuccess(res, req.course, 201)
  } else {
    Course.find({})
      .then(data => {
        requestHandler.onSuccess(res, data, 200)
      })
      .catch(err => {
        const errMsg = 'in GET courses '
        requestHandler.onError(res, errMsg, err)
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

module.exports.getCourses = getCourses
// module.exports.createCourse = createCourse


