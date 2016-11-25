var mqtt = require('mqtt');
var client = mqtt.connect({port: 1883, host: '192.168.1.150', keepalive: 10000});

client.subscribe('sensorsfeed/commandsget/18fe34de7370')
client.on('message', function (topic, message) {
   console.log(message.toString());
//   return new Promise(function(resolve,reject) {
//        var theDb;
//        return MongoClient.connectAsync(connection)
//            .then( function(db) {
//                  theDb = db;
//                  return theDb.collection("senzor1").insertAsync(newValue);
//            })
//            .then(resolve)
//            .finally(() => {
//                theDb.close()
//            })
//            .catch(reject);
//   });

});

//client.end()
