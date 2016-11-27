var dotenv = require('dotenv');
var mqtt = require('mqtt');
dotenv.load();


var clientget = mqtt.connect({port: process.env.MQTT_PORT , host: process.env.MQTT_HOST, keepalive: 10000});
const mac_id='a8fe34de7370';
var hist=0.5;
var interval=5;



var clientinit = mqtt.connect({port: process.env.MQTT_PORT , host: process.env.MQTT_HOST, keepalive: 10000});
    clientinit.subscribe('sensorsfeed/temperature/'+mac_id)
    clientinit.publish('sensorsfeed/temperature/'+mac_id, 'init=0='+mac_id )


function request() {
    clientinit.publish('sensorsfeed/temperature/'+mac_id, 'temp='+ Math.floor(Math.random() * 100) +'.99='+mac_id )
}

var run = setInterval(request, interval*1000);

clientget.subscribe('sensorsfeed/commands/'+mac_id)
clientget.on('message', function (topic, message) {
    console.log(topic);
    console.log(message.toString());
    clearInterval(run);
    interval=message.toString().split('=')[4];
    run = setInterval(request, interval*1000);

    var clientsend = mqtt.connect({port: process.env.MQTT_PORT , host: process.env.MQTT_HOST, keepalive: 10000});
    clientsend.subscribe('sensorsfeed/response/'+mac_id)
    clientsend.publish('sensorsfeed/response/'+mac_id, message.toString()+ '---raspuns---' )
    clientsend.end();
});


//client1.subscribe('sensorsfeed/commandsget/18fe34de7370')
//
//client1.on('message', function (topic, message) {
//    console.log(topic);
//    console.log(message.toString());
//});
//client1.end()
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

