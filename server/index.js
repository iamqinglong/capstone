require('./config/config');
require('./models/db');
require('./config/passportConfig')

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http')
const websocket = require('websocket-stream')
const aedes = require('aedes')()
const mqtt = require('net').createServer(aedes.handle);
const passport = require('passport')
const app = express(http);
const web = http.createServer(app);
const rtsIndex = require('./routes/index.router')
const serialPort = require('serialport');
const readLine = serialPort.parsers.Readline;

app.use(cors());
app.use(bodyParser.json());
app.use( bodyParser.urlencoded({ extended : false }) );
app.use(passport.initialize())
app.use(passport.session());
app.use('/api',rtsIndex)
const error = require('./error_handler/error.handler')
app.use(error)


var mqtt_port = process.env.MQTT_PORT || 1883
// var port = process.env.HTTP_PORT || 8080
mqtt.listen(mqtt_port, () => {
    console.log(`MQTT Server listening on ${mqtt_port}`)
});


web.listen(process.env.PORT, () => {
    console.log(`Web Server running at ${process.env.PORT} , ${web.address().address}`)
})
websocket.createServer({server: web}, aedes.handle);

aedes.on('clientError', function (client, err) {
console.log('client error', client.id, err.message, err.stack)
})

aedes.on('connectionError', function (client, err) {
    console.log('client error', client, err.message, err.stack)
})

aedes.on('clientDisconnect', function(client) {
    console.log('client disconnected',client.id)
});
aedes.on('publish', function (packet, client) {
    
    packet.payloadString = packet.payload.toString();
    packet.payloadLength = packet.payload.length;
    packet.payload = JSON.stringify(packet.payload);
    packet.timestamp = new Date();
    
    // console.log(packet.payload);
})

aedes.on('subscribe', function (subscriptions, client) {
    if (client) {
    console.log('subscribe from client', subscriptions, client.id)
    }
})

aedes.on('client', function (client) {
    console.log('new client', client.id)
})

aedes.on('unsubscribe', function(topic, client) {
    console.log('Unsubs client: ' , client.id)
});

app.get('/',(req,res)=>{
    res.send({
        message: "HELLO WORLD"
    })
})

//SERIAL COMMUNICATION
const sensorPort = new serialPort('COM3', {
    baudRate: 9600,
});

const parser = sensorPort.pipe(new readLine({ delimiter: '\r\n'}));
parser.on('open', onOpen);

parser.on('data', (data) => {

    console.log(data)

   try{
        
    aedes.publish({
        qos: 0,
        topic: '/temp1',
        payload: data,
        retain: false
      });
    let datum = parseInt(data)+2
    aedes.publish({
        qos: 0,
        topic: '/temp2',
        payload: datum.toString(),
        retain: false
    });
    // console.log('test')

   }catch(error){
        console.log(error)
   }

    
      
});
function onOpen() {
    console.log('Arduino connected!');
}