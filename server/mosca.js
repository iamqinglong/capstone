const express = require('express');
const app = express();
const ip = require('ip')
//Mosca
const mosca = require('mosca')

const settings = {
   http: {
    // port for websockets, MQTT is running in default port 1883
    port: 8000 ,
    // bundle: true,
  },
  
}
// start mosca
const moscaServer = new mosca.Server(setting)

moscaServer.on('ready', setup)
// fired when the mqtt server is ready
function setup() {
    console.log(`Mosca server is up and running in :1883`)
    console.log('Using port 8000 for MQTT over Web-Sockets!')
}
// fired when a client is connected
moscaServer.on('clientConnected', async(client, subscriptions) => {
    console.log('client connected', client.id , client.subscriptions)
})
// fired when a message is received
moscaServer.on('published', function(packet, client) {
    //if (packet.topic == '/example') {
    //   console.log(packet.payload.toString('utf-8'))
    //}
})
// fired when a client subscribes to a topic
moscaServer.on('subscribed', function(topic, client) {
    console.log('subscribed : ', topic, client.id)
})
// fired when a client unsubscribes to a topic
moscaServer.on('unsubscribed', function(topic, client) {
    console.log('unsubscribed : ', topic)
})
// fired when a client is disconnecting
moscaServer.on('clientDisconnecting', function(client) {
    console.log('clientDisconnecting : ', client.id)
})
// fired when a client is disconnected
moscaServer.on('clientDisconnected', function(client, subscriptions) {
    console.log('clientDisconnected : ', client.id, client.subscriptions)
})

module.exports = moscaServer