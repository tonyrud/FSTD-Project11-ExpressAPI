const User = require('./../models/models').User
const requestHandler = require('./../middleware/requestHandlers')

function getUsers (req, res, next) {
  User.find()
    .then(data => {
      requestHandler.onSuccess(res, data, 200)
    })
    .catch(err => {
      const errMsg = 'in GET users '
      requestHandler.onError(res, errMsg, err)
    })
}
function createUser (req, res, next) {
      // make sure
  if (req.body.password && req.body.confirmPassword && req.body.fullName && req.body.emailAddress) {
    if (req.body.password !== req.body.confirmPassword) {
      var err = new Error('passwords do not match')
      err.status = 400
      return next(err)
    } else {
       // create the object we're going to send the mongoose
      var userData = {
        fullName: req.body.fullName,
        emailAddress: req.body.emailAddress,
        password: req.body.password
      }

            // insert into mongo with Schema's create method from mongoose
      User.create(userData, function (error, user) {
        if (error) {
          return next(error)
        } else {
              // follow up action
          // req.session.userId = user._id
          return res.redirect('/')
        }
      })
    }
  } else {
    let err = new Error('All fields required')
    err.status = 400
    // res.send()
    return next(err)
  }
}

module.exports.getUsers = getUsers
module.exports.createUser = createUser


