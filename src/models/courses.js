const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  title: {type: String, required: [true, 'Title is required.']},
  description: {type: String, required: [true, 'Description is required.']},
  estimatedTime: String,
  materialsNeeded: String,
  steps: [
    {
      stepNumber: Number,
      title: { type: String, required: [true, 'Step title is required.'] },
      description: { type: String, required: [true, 'Step description is required.'] }
    }
  ],
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
})

module.exports = CourseSchema
