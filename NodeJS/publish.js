var mqtt = require('mqtt');
var clientget = mqtt.connect({port: 1883, host: '192.168.1.150', keepalive: 10000});
var clientsend = mqtt.connect({port: 1883, host: '192.168.1.150', keepalive: 10000});


clientsend.subscribe('sensorsfeed/commands/18fe34de7370')
clientsend.publish('sensorsfeed/commands/18fe34de7370', 'mod=hist=0.2=interval=10')
clientsend.end()


clientget.subscribe('sensorsfeed/response/18fe34de7370')
clientget.on('message', function (topic, message) {
    console.log(topic);
    console.log(message.toString());
    clientget.end()

});

//client.subscribe('sensorsfeed/commands/'+ mac_id)
//client.publish('sensorsfeed/commandsend/'+ mac_id, 'mod=hist=0.2=interval=10')
//client.publish('sensorsfeed/commandsend/'+ mac_id, 'get')
//client.subscribe('sensorsfeed/commandsget/'+mac_id)
//client.on('message', function (topic, message) {



//console.log("after");



//client.on('message', function (topic, message1) {
//  a=message1.toString();
//  console.log(a)
//});

