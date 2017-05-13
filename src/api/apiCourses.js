const Models = require('./../models/models')
const requestHandler = require('./../middleware/requestHandlers')

function apiGetCourses (req, res, next) {
  Models.Course.find()
    .then(data => {
      requestHandler.onSuccess(res, data)
    })
    .catch(err => {
      const errMsg = 'in GET courses '
      requestHandler.onError(res, errMsg, err)
    })
}

module.exports = apiGetCourses


