function onSuccess (res, data) {
  return res.status(200).json({payload: data})
}

function onError (res, message, err) {
  console.error('Promise chain error ', message, err)
  res.status(500).send()
}

module.exports.onSuccess = onSuccess
module.exports.onError = onError
