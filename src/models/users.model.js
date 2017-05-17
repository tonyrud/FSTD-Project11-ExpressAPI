const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const models = require('./models')
const middleWare = require('./../middleware/index')

var UserSchema = new Schema({
  fullName: {type: String, required: [true, 'Name is required.']},
  emailAddress: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required.',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {type: String, required: [true, 'Password is required.']}
})

// authenticate user
// UserSchema.statics.authenticate = function (email, password, res, next, callback) {
//   models.User.findOne({emailAddress: email})
//     .then(user => {
//       bcrypt.compare(password, user.password, function (error, result) {
//         if (result) {
//           return callback(null, user)
//         } else {
//           return callback(error)
//         }
//       })
//     })
//     .catch(err => {
//       const errMsg = 'in GET users '
//       err.message = 'User not found'
//       middleWare.onError(res, errMsg, err, next)
//     })

        // .exec(function (error, user) {
        //   if (error) {
        //     return callback(error)
        //   } else if (!user) {
        //     const err = new Error('User not found')
        //     err.status = 401
        //     return callback(err)
        //   }
        //   bcrypt.compare(password, user.password, function (error, result) {
        //     if (result) {
        //       return callback(null, user)
        //     } else {
        //       return callback(error)
        //     }
        //   })
        // })
// }

UserSchema.statics.authenticate = function (email, password, res, req, callback) {
  models.User.findOne({emailAddress: email})
    .exec(function(err, user){
      if (err) {
        return callback(err);
      } else if (!user) {
        err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result){
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      });
    });
}

// hash password
UserSchema.pre('save', function (next) {
  var user = this
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})

module.exports = UserSchema
