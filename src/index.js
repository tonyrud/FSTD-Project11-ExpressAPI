'use strict';

// load modules
var express = require('express');
var morgan = require('morgan');
const bodyParser = require('body-parser')
const initMongoDb = require('./db/db')
var app = express();

// Get API routes
const apiRoutes = require('./api/api.routes')
// set our port
app.set('port', process.env.PORT || 5000);

// morgan gives us http request logging
app.use(morgan('dev'));
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// setup our static route to serve files from the "public" folder
app.use('/', express.static('public'));


// initialize mongodb
initMongoDb()

// initialze api routes
app.use('/api', apiRoutes)
// api(app)

// Home route
app.get('/', (req, res, next) => {
  res.status(201).send()
});
// catch 404 and forward to global error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Express's global error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  })
});


// start listening on our port
var server = app.listen(app.get('port'), function() {
  console.log('Express server is listening on port ' + server.address().port);
});
