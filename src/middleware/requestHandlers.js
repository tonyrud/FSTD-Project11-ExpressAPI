function onSuccess (res, data, status) {
  return res.status(status).json({payload: data})
}

function onError (res, message, err) {
  console.error('Promise chain error ', message, err)
  // res.status(500)
  // return next(err)
}

module.exports.onSuccess = onSuccess
module.exports.onError = onError
