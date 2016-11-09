var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')


client.subscribe('senzor1')
var date = new Date().getTime;
console.log(new Date().getTime().toString());
client.publish('senzor1', '23.45555')
console.log(new Date().getTime().toString());
var a="BBB"
//client.on('message', function (topic, message1) {
//  a=message1.toString();
//  console.log(a)
//});

client.end()
