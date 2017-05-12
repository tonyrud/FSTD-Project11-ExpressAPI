function onSuccess (res, data, next) {
  // console.log('ONSUCCESS', data)
  console.log('SUCCESS!', data)
  res.status(200)
  // return res.status(200).json({payload: data})
  next()
}

function onError (res, message, err) {
  console.error('Promise chain error ', message, err)
  res.status(500).send()
}

module.exports.onSuccess = onSuccess
module.exports.onError = onError
