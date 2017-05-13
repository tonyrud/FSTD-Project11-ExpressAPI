const User = require('./../models/models').User
const requestHandler = require('./../middleware/requestHandlers')

function apiGetUsers (req, res, next) {
  User.find()
    .then(data => {
      requestHandler.onSuccess(res, data)
    })
    .catch(err => {
      const errMsg = 'in GET users '
      requestHandler.onError(res, errMsg, err)
    })
}

module.exports = apiGetUsers


