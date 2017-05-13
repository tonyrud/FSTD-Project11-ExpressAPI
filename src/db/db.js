const mongoose = require('mongoose')
const dbPort = 27017
const seeder = require('mongoose-seeder')
const data = require('./../data/data.json')


function initMongoDb () {
  // mongodb connection
  mongoose.connect(`mongodb://localhost:${dbPort}/course-rating-api`)
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error: '))
  db.once('open', () => {
    console.log(`db connection open on port ${dbPort}`)
    seedData()
  })
}

function seedData () {
  seeder.seed(data).then(function (dbData) {
      // The database objects are stored in dbData
    console.log('data seeded')
  }).catch(function (err) {
      // handle error
    console.error('seed error: ', err.errors)
  })
}

module.exports = initMongoDb
