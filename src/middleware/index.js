function onSuccess (res, data, status) {
  return res.status(status).json({payload: data})
}

function onSuccessPost (res, data, status) {
  res.status(status);
  res.location('/');
  res.end();
}

function onError (res, message, err) {
  console.error('Promise chain error ', message, err)
  res.status(500).send()
}

function authenticate(req, res, next){
  var credentials = auth(req);
  if (!credentials) {
    var err = new Error('Email or password not provided.');
    err.status = 401;
    return next(err);
  } else {
    User.authenticate(credentials.name, credentials.pass, function (err, user){
      if (err || !user) {
        var err = new Error('Incorrect email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.data = user;
        return next();
      }
    });
  }
}

module.exports.onSuccess = onSuccess
module.exports.onSuccessPost = onSuccessPost
module.exports.onError = onError
module.exports.authenticate = authenticate

