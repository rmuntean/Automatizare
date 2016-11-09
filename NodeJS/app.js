var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var cors = require('cors');
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')
var app = express();

dotenv.load();
app.use(cors());
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

var routes = require('./routes/routes');

// view engine setup
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

//read senzor temperature
var TemperatureController = require('./routes/temperatureController');

client.subscribe('senzor1')
client.on('message', function (topic, message) {
    var temperature = {
        temperature: message.toString(),
        date: Date.now()
    };
    console.log(message.toString());
    TemperatureController.saveTemperature(temperature)
        .then(function() {
             console.log("DONE")
        })
        .catch(function() {
             console.log("Failed")
        });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});


module.exports = app;
