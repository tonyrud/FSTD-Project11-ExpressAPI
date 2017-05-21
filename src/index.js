'use strict'

// load modules
var express = require('express')
var morgan = require('morgan')
const bodyParser = require('body-parser')
const initMongoDb = require('./db/db')
var app = express()

// Get API routes
const apiRoutes = require('./api/api')
// set our port
app.set('port', process.env.PORT || 5000)

// morgan gives us http request logging
app.use(morgan('dev'))
// Parsers for POST data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// setup our static route to serve files from the "public" folder
app.use('/', express.static('public'))


// initialize mongodb
initMongoDb()

// initialze api routes
app.use('/api', apiRoutes)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-requested-With, Content-Type, Accept')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE')
    return res.status(200).json({})
  }
  next()
})

// catch 404 and forward to global error handler
app.use((req, res, next) => {
  var err = new Error('File Not Found')
  err.status = 404
  next(err)
})

// Mongo validation error handler
app.use((err, req, res, next) => {
  res.status(err.status || 400)
  if (err.validationMsgs) {
    res.json({
      error: {
        message: err.validationMsgs
      }
    })
  } else {
    next(err)
  }
})
// global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    error: {
      message: err.message
    }
  })
})


// start listening on our port
var server = app.listen(app.get('port'), () => {
  console.log('Express server is listening on port ' + server.address().port)
})

module.exports = server
