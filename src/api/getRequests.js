const User = require('./../models/models')
const requestHandler = require('./../middleware/index')

function apiGetUsers (req, res, next) {
  console.log('api get users')
  User.find({})
    .sort({createdAt: -1})
    // .exec(function (err, questions) {
    //   if (err) return next(err)
    //   res.json(questions)
    // })
    .then(data => {
      // console.log(data)
      requestHandler.onSuccess(req, data, next)
    })
    // .catch(_.partial(onError, res, 'Find all courses failed'))
}

module.exports = apiGetUsers


