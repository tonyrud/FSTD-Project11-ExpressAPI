const models = require('./../models/models')
var auth = require('basic-auth')

function onSuccess (res, data, status) {
  return res.status(status).json({ payload: data })
}

function onSuccessPost (res, data, status) {
  res.status(status)
  res.location('/')
  res.end()
}

function buildErrArray (err) {
  const validationMsgs = []
  // loop through error object, push errors to array
  for (let key of Object.keys(err.errors)) {
    const currentItem = err.errors[key]
    validationMsgs.push(currentItem.message)
  }
  return validationMsgs
}

function onError (res, message, err, next) {
  console.error('Promise chain error', message, err)
  // res.status(500).send()
  next(err)
}

function authenticate (req, res, next) {
  const credentials = auth(req)
  if (!credentials) {
    var err = new Error('Email or password not provided.')
    err.status = 401
    return next(err)
  } else {
    models.User.authenticate(credentials.name, credentials.pass, res, next, (error, user) => {
      if (error || !user) {
        var err = new Error('Incorrect email or password.')
        err.status = 401
        return next(err)
      } else {
        req.data = user
        return next()
      }
    })
  }
}

module.exports.onSuccess = onSuccess
module.exports.onSuccessPost = onSuccessPost
module.exports.buildErrArray = buildErrArray
module.exports.onError = onError
module.exports.authenticate = authenticate

