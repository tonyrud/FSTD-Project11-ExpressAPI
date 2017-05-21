const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  postedOn: {type: Date, default: Date.now()},
  rating: {type: Number,
    required: [true, 'Rating is required.'],
    min: [1, 'Must give at least 1 star rating.'],
    max: [5, 'Cannot give more than 5 star rating.']},
  review: String
})

module.exports = ReviewSchema
