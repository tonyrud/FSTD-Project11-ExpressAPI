const User = require('./../models/models').User
const middleWare = require('./../middleware/')

function getUsers (req, res, next) {
  const authenticatedUser = req.data.emailAddress
  User.find({emailAddress: authenticatedUser})
    .then(users => {
      middleWare.onSuccess(res, users, 200)
    })
    .catch(err => {
      const errMsg = 'in GET users '
      middleWare.onError(res, errMsg, err, next)
    })
}

function createUser (req, res, next) {
  var user = new User(req.body)
  user.save()
  .then(user => {
    middleWare.onSuccessPost(res, user, 201)
  })
  .catch(err => {
    // check if error is a validation error
    if (err.name === 'ValidationError') {
      // loop through error array and add to validationMsgs
      err.validationMsgs = middleWare.buildErrArray(err)
    }
    const errMsg = 'in POST create user '
    middleWare.onError(res, errMsg, err, next)
  })
}

module.exports.getUsers = getUsers
module.exports.createUser = createUser


