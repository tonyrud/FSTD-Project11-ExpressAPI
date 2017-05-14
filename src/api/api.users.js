const User = require('./../models/models').User
const middleWare = require('./../middleware/')

function getUsers (req, res, next) {
  User.find()
    // .exec()
    .then(users => {
      middleWare.onSuccess(res, users, 200)
    })
    .catch(err => {
      const errMsg = 'in GET users '
      middleWare.onError(res, errMsg, err)
    })
}
function createUser (req, res, next) {

    var user = new User(req.body);
    user.save()
    .then(user => {
      // if (err) return next(err);
      middleWare.onSuccessPost(res, user, 201)
      
    })
    .catch(err => {
      // check if error is a validation error
      if (err.name === 'ValidationError') {
        err.validationMsgs = []
        // loop through error object, push errors to array
        for (let key of Object.keys(err.errors)) {
          const currentItem = err.errors[key]
          err.validationMsgs.push(currentItem.message)
        }  
      }
      next(err)
    })
}

module.exports.getUsers = getUsers
module.exports.createUser = createUser


