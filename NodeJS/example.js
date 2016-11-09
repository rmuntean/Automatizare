var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')
var bluebird = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
var MongoCollection  = require('mongodb').Collection;

bluebird.promisifyAll(MongoCollection.prototype);
bluebird.promisifyAll(MongoClient);

const connection ="mongodb://localhost:27017/automatizare";

client.subscribe('presence')
client.on('message', function (topic, message) {
    var newValue = {
        temperature: message.toString(),
        date: Date.now()
    };
   console.log(message.toString());
   return new Promise(function(resolve,reject) {
        var theDb;
        return MongoClient.connectAsync(connection)
            .then( function(db) {
                  theDb = db;
                  return theDb.collection("senzor1").insertAsync(newValue);
            })
            .then(resolve)
            .finally(() => {
                theDb.close()
            })
            .catch(reject);
   });

});

//client.end()
