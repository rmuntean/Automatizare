var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')


client.subscribe('senzor1')

console.log('before');
client.publish('senzor1', '21.45555')
console.log("after");

//client.on('message', function (topic, message1) {
//  a=message1.toString();
//  console.log(a)
//});

client.end()
