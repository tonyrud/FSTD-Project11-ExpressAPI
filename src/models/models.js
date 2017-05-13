const mongoose = require('mongoose')

const Schema = mongoose.Schema

var UserSchema = new Schema({
  fullName: {type: String, required: [true, 'Name is required.']},
  emailAddress: {
    type: String, 
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required.",
  },
  password: {type: String, required: [true, 'Password is required.']}
});

var ReviewSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  postedOn: {type: Date, default: Date.now()},
  rating: {type: Number, 
    required: [true, 'Rating is required.'], 
    min: [1, 'Must give at least 1 star rating.'], 
    max: [5, 'Cannot give more than 5 star rating.']},
  review: String
});

var CourseSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  title: {type: String, required: [true, 'Title is required.']},
  description: {type: String, required: [true, 'Description is required.']},
  estimatedTime: String,
  materialsNeeded: String,
  steps: [
    {
      stepNumber: Number,
      title: {type: String, required: [true, 'Title is required.']},
      description: {type: String, required: [true, 'Description is required.']}
    }
  ],
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
    //Array of ObjectId values from reviews collection
});

module.exports.User = mongoose.model('User', UserSchema)
module.exports.Course = mongoose.model('Course', CourseSchema)
module.exports.Review = mongoose.model('Review', ReviewSchema)

