var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var cors = require('cors');
var mqtt = require('mqtt');

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


var client = mqtt.connect({port: process.env.MQTT_PORT , host: process.env.MQTT_HOST, keepalive: 10000});
client.subscribe('sensorsfeed/temperature/#')
client.on('message', function (topic, message) {
    //temp=23.56=18fe34de7370
        let mac_id = message.toString().split('=')[2]
if (message.toString().split('=')[0] == 'temp'){

    var temperature = {
        temperature: message.toString().split('=')[1],
        date: Date.now()
    };
    console.log(temperature);
    TemperatureController.saveTemperature(temperature,mac_id)
        .then(function() {
             console.log("DONE")
        })
        .catch(function() {
             console.log("Failed")
        });
    }else if (message.toString().split('=')[0] == 'init'){
         var clientsend = mqtt.connect({port: process.env.MQTT_PORT , host: process.env.MQTT_HOST, keepalive: 10000});
         clientsend.subscribe('sensorsfeed/commands/'+mac_id)
         clientsend.publish('sensorsfeed/commands/'+mac_id, 'mod=hist=0.2=interval=10')
         clientsend.end()

            var clientget = mqtt.connect({port: process.env.MQTT_PORT , host: process.env.MQTT_HOST, keepalive: 10000});
            clientget.subscribe('sensorsfeed/response/'+mac_id)
            clientget.on('message', function (topic, message) {
            console.log(topic);
            console.log(message.toString());
            clientget.end()

});
        console.log(message.toString());
    }
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
