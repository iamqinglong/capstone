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
const axios = require('axios');
const ip = require('ip')
const mosca = require('mosca')
const _sms = require('./sms')
const serialportgsm = require('serialport-gsm')
// const router = require('./node_modules/huawei-router-api');
let modemPort="COM4"; // default serial port for modemy
const gsmModem = serialportgsm.Modem();
        const options = {
            baudRate: 9600,
            dataBits: 8,
            parity: 'none',
            stopBits: 1,
            flowControl: false,
            xon: false,
            rtscts: false,
            xoff: false,
            xany: false,
            // autoDeleteOnReceive: true,
            enableConcatenation: true,
            incomingCallIndication: true,
            // incomingSMSIndication: true,
            // customInitCommand: `AT+CPMS="SM","SM","SM"`,
            // autoOpen: true,
            logger: console,
        }
let modemStatus = false;
let modemNumber = null
let modemSignal = null;
let portStatus = false; 
let balanceStatus = false;

// router.config.setUrl('http://192.168.1.1');
// router.config.setUsername('admin');
// router.config.setPassword('password');

app.use(cors());
app.use(bodyParser.json());
app.use( bodyParser.urlencoded({ extended : false }) );
app.use(passport.initialize())
app.use(passport.session());
app.use('/api',rtsIndex)
const error = require('./error_handler/error.handler')
app.use(error)

// _sms.openModem()



//MQTT AND WEB SERVER INITIALIZATION
var mqtt_port = process.env.MQTT_PORT || 1883
mqtt.listen(mqtt_port, () => {
    console.log(`MQTT Server listening on ${mqtt_port} , ${mqtt.address().address}`)
});


web.listen(process.env.PORT, ip.address(),() => {
    console.log(`Web Server running at ${process.env.PORT} , ${web.address().address}`)
})
websocket.createServer({server: web}, aedes.handle);

//SMS INITIALIZATION

    axios.post(`http://${ip.address()}:${process.env.PORT}/openModem`,{
        modemPort: modemPort
    }).then(response => {
        console.log(response.data.message)
      })
      .catch(error => {
        console.log(error)
      })




// gsmModem.open(modemPort, options, (err) => {
//     if (err) {
//         console.log("Gateway", `Error opening modem`);
//         return
//     }
//     else{
//         gsmModem.initializeModem((msg,err) => 
//         {
//             if(err)
//             {
//                 console.log("Initialize Modem Failed")
//                 gsmModem.close((err) => {
//                     console.log('port closed', err);
//                 })
//                 return
//             }
//             else
//             {
//                 console.log('initialize msg:', msg.data)
//                    // gsmModem add at+qnwinfo (carrier info), and at+qspn (service provider name)  for debug logs
//                 gsmModem.setModemMode((msg,err) => {
//                     if (err) {
//                         //console.log(`Error Setting Modem Mode - ${err}`);
//                         console.log("Gateway", `Error Setting Modem Mode`);
//                         gsmModem.close((err) => {
//                             console.log('port closed', err);
//                         })
//                     } else {
//                         console.log(`Set Mode: ${msg.data}`);

//                         // capture signal strength for the logs
//                         gsmModem.getNetworkSignal((sigStrength, err) => {
//                             if (err) {
//                                 //console.log(`Error retrieving Signal Strength - ${err}`);
//                                 console.log("Gateway", `Error retrieving Signal Strength`);
//                             } else {
//                                 console.log(`Signal Strength = ${sigStrength.data.signalQuality}`);
//                             }
//                         });
                        
//                         gsmModem.getOwnNumber(msg => console.log(msg))
//                     }	
//                 }, "PDU");

                
                
//             }
//         });
     
//     }
// });

// async function checkStatistics() {
//     // Check if we are logged into the router already
//     const loggedIn = await router.admin.isLoggedIn();
//     if (!loggedIn) {
//       // If we aren't, login
//       await router.admin.login();
//     }
//     const stats = await router.monitoring.getTrafficStatistics();
//     let smsDetails = {numbers: ['09122854978'],
//     content: 'this is test using api 2'}
//     const sms = await router.sms.sendSms(smsDetails);
//     console.log(stats);
//     console.log(sms)
//     const smsList = await router.sms.getSmsList(1,20,1,desc)
//     console.log(smsList)
//   }
// async function sendSMSTest() {
//     // Check if we are logged into the router already
//     const loggedIn = await router.admin.isLoggedIn();
//     if (!loggedIn) {
//       // If we aren't, login
//       await router.admin.login();
//     }
//     let smsDetails = {numbers: ['09187004596'],
//                       content: 'this is test using api'}
//                       console.log(smsDetails)
//     const sms = await router.sms.sendSms(smsDetails);
//     console.log(sms);
// }
//   checkStatistics();
// //   sendSMSTest()
//SMS EVENTS
gsmModem.on('open', async(msg) => { console.log('on open result: ',msg)
          
        // let res = await axios.post(`http://${ip.address()}:${process.env.PORT}/api/createNotification`,{
        //     subject : `Modem succesfully connected`,
        //     message: `Modem at ${msg.data.modem} status ${msg.data.status}`
        // })

        // aedes.publish({
        //     qos: 0,
        //     topic: '/notification',
        //     payload: JSON.stringify(res.data.result),
        //     retain: true
        // });

        // modemStatus = true
        // console.log('Modem status ', modemStatus)
})
gsmModem.on('close', async (msg,err) => {
            console.log('on close msg:' , (msg))
            if(msg == undefined)
            {
                console.log('No modem detected during close')
            }else{
                if(portStatus)
                {
                    let res = await axios.post(`http://${ip.address()}:${process.env.PORT}/api/createNotification`,{
                    subject : `Modem disconnected`,
                    message: `Modem at ${msg.modem} status is ${msg.status}`
                    // message: `Modem at ${msg}`
                    })

                    aedes.publish({
                        qos: 0,
                        topic: '/notification',
                        payload: JSON.stringify(res.data.result),
                        retain: false
                    });
                }
                

                modemStatus = false
                console.log('Modem status ', modemStatus)
            }
        

});

// gsmModem.on('error',  async (msg) => {console.log('on error msg:' , msg)

//             // let res = await axios.post(`http://${ip.address()}:${process.env.PORT}/api/createNotification`,{
//             //     subject : `Modem error`,
//             //     message: `Modem is currently experiencing an error`
//             // })

//             // aedes.publish({
//             //     qos: 0,
//             //     topic: '/notification',
//             //     payload: JSON.stringify(res.data.result),
//             //     retain: true
//             // });


// });


//AEDES EVENTS
aedes.on('clientError', function (client, err, subscriptions) {
    // console.log('client error', client.id, err.message, err.stack)
    console.log('client error', client.id)
    console.log('error topics : ', client.subscriptions)
})

aedes.on('connectionError', function (client, err) {
    console.log('client error', client, err.message, err.stack)
})

aedes.on('clientDisconnect', function(client, subscriptions, topic) {
    // console.log('client disconnected',client)
    // console.log('client disconnected topics :', topics)
    console.log('client disconnected : ', client.id, ' disconnected topic : ', subscriptions)
});
aedes.on('publish', async (packet, client, topic ) => {
    // console.log(packet)
    if(!client) return
    packet.payloadString = packet.payload.toString();
    packet.payloadLength = packet.payload.length;
    packet.payload = JSON.stringify(packet.payload);
    packet.timestamp = new Date();

    console.log('Publisher : ',client.id, ' Value : ', packet.payloadString, ' Topic : ', packet.topic)
    // console.log(packet);

       try{
     //Get event by topic/ don't forget to change temp2 dynamically
        let events = await axios.get(`http://${ip.address()}:${process.env.PORT}/api/getEventByTopic/?topic=${packet.topic}`)
        // console.log(events.data[0])
        if(events.data.length != 0 || events.data == null)
        {
            events.data[0].events.forEach(async (element) => {
                // console.log(packet.topic)
                // console.log(element.statement)
                // console.log(element.value)
                    if( element.statement == 'goes more than' )
                    {
                        // console.log(element.statement)
                        // console.log(packet.payloadString)
                        if(packet.payloadString > element.value )
                        {
                            console.log(element.value)
                            let res = await axios.post(`http://${ip.address()}:${process.env.PORT}/api/createNotification`,{
                                subject : `${events.data[0].device_name} is high`,
                                message: `${events.data[0].device_name} is ${packet.payloadString} which is greater than the maximum threshold ${element.value}`
                            })
                            
                            aedes.publish({
                                qos: 0,
                                topic: '/notification',
                                payload: JSON.stringify(res.data.result),
                                retain: false
                            });
                            
                            let technician = await axios.get(`http://${ip.address()}:${process.env.PORT}/api/getDeviceTechnicianByTopic/?topic=${packet.topic}`) 
                            if(modemStatus)
                            {
                                 technician.data.device[0].technicians_numbers.forEach(async(element) => {
                                    // console.log(element,res.data.result[0].message)
                                    sendSMS(element,`${res.data.result[0].message} , This is an automated service. Please do not reply`)
                                })
                            }
                            
                        }
                    }
                    else if( element.statement === 'goes less than' )
                    {
                        if(packet.payloadString < element.value )
                        {
                            //console.log(element.value)
                            let res = await axios.post(`http://${ip.address()}:${process.env.PORT}/api/createNotification`,{
                                subject : `${events.data[0].device_name} is low`,
                                message: `${events.data[0].device_name} is ${packet.payloadString} which lower than the minimum threshold ${element.value}`
                            })
                        
                            aedes.publish({
                                qos: 0,
                                topic: '/notification',
                                payload: JSON.stringify(res.data.result),
                                retain: false
                            });
    
                            let technician = await axios.get(`http://${ip.address()}:${process.env.PORT}/api/getDeviceTechnicianByTopic/?topic=${packet.topic}`) 
                            if(modemStatus)
                            {
                                 technician.data.device[0].technicians_numbers.forEach(async(element) => {
                                    // console.log(element,res.data.result[0].message)
                                    sendSMS(element,`${res.data.result[0].message} , This is an automated service. Please do not reply`)
                                })
                            }
                        }                  
                    }
          });
        }
        let reading = await axios.post(`http://${ip.address()}:${process.env.PORT}/api/insertReading`,{
            // device_id: 
            topic: packet.topic,
            value: packet.payloadString
        })

        if(reading.data.status) console.log(reading.data.message)
       
    }catch(error){
        console.log(error)
    }
})

aedes.on('subscribe', async (subscriptions, client) => {
    if (client) {
        let id = client.id.split('_')
        if(id[0] === 'device'){
            
            let events = await axios.put(`http://${ip.address()}:${process.env.PORT}/api/updateStatusByTopic/?topic=${subscriptions[0].topic}`,
                                            {status : true})
                aedes.publish({
                    qos: 0,
                    topic: '/status',
                    payload: subscriptions[0].topic,
                    retain: false
                  });
            let device = await axios.get(`http://${ip.address()}:${process.env.PORT}/api/getDeviceByTopic/?topic=${subscriptions[0].topic}`)
            let res = await axios.post(`http://${ip.address()}:${process.env.PORT}/api/createNotification`,{
                                subject : `${device.data.device.device_name} is reconnected`,
                                message: `${device.data.device.device_name} is back to business`
                            })
                        
                            aedes.publish({
                                qos: 0,
                                topic: '/notification',
                                payload: JSON.stringify(res.data.result),
                                retain: false
                            });
            // console.log('Device: ', device.data)
            console.log('Subscribe client: ' , client.id)
            console.log('topics : ' , subscriptions[0].topic)
            return;
        }
    
        console.log('Subscribe client: ' , client.id)
        console.log('topics : ' , subscriptions)
    }
})

aedes.on('client', function (client) {
    console.log('new client', client.id)
})

aedes.on('unsubscribe', async (subscriptions, client) => {
    try {
        
    
    let id = client.id.split('_')
    
    if(id[0] === 'device'){
        
        subscriptions.forEach(async (element) => {
            let events = await axios.put(`http://${ip.address()}:${process.env.PORT}/api/updateStatusByTopic/?topic=${element}`,
                                        {status : false})
            aedes.publish({
                    qos: 0,
                    topic: '/status',
                    payload: element,
                    retain: false
                });

            let device = await axios.get(`http://${ip.address()}:${process.env.PORT}/api/getDeviceByTopic/?topic=${element}`)
            
            let res = await axios.post(`http://${ip.address()}:${process.env.PORT}/api/createNotification`,{
                                subject : `${device.data.device.device_name} is disconnected`,
                                message: `${device.data.device.device_name} is interrupted, Please check the device condition.`
                            })
                        
                            aedes.publish({
                                qos: 0,
                                topic: '/notification',
                                payload: JSON.stringify(res.data.result),
                                retain: false
                            });
            if(modemStatus)
            {
                console.log(res.data.result)
                sendSMS(element,`${res.data.result[0].message} , This is an automated service. Please do not reply`)
            }
        })
       
        
        console.log('Unsubs client: ' , id[0])
        console.log('topics : ' , subscriptions)
        return;
    }

    console.log('Unsubs client: ' , client.id)
    console.log('topics : ' , subscriptions)
    } catch (error) {
        console.log(error)    
    }
});
app.post('/openModem',(req,response,next)=>{

    try {

        gsmModem.open(req.body.modemPort, options,async (err,data) => {
            if (err) {
                console.log(`Error opening modem`);

                // let res = await axios.post(`http://${ip.address()}:${process.env.PORT}/api/createNotification`,{
                //     subject : `Modem problem`,
                //     message: `Opening modem failed, Please try again`
                // })
                // // console.log(res.data.result)
                // aedes.publish({
                //     qos: 0,
                //     topic: '/notification',
                //     payload: JSON.stringify(res.data.result),
                //     retain: false
                // });
                response.send({status: false, message: 'Opening modem failed'})

                modemStatus = false
                console.log('Modem status ', modemStatus)
                return
            }
            else{
                // modemStatus = true
                console.log('Opening port: ', portStatus)
                gsmModem.initializeModem(async (msg,err) => 
                {
                    if(err)
                    {
                        
                        // let res = await axios.post(`http://${ip.address()}:${process.env.PORT}/api/createNotification`,{
                        //     subject : `Modem problem`,
                        //     message: `Initialize Modem Failed, Please try again.`
                        // })

                        // aedes.publish({
                        //     qos: 0,
                        //     topic: '/notification',
                        //     payload: JSON.stringify(res.data.result),
                        //     retain: false
                        // });
                        console.log("Initialize Modem Failed")
                        response.send({status: false, message: 'Initialize Modem Failed'})
                        // modemStatus = false
                        console.log('Modem status ', modemStatus)
                        gsmModem.close((err) => {
                            console.log('port closed', err);
                        })
                        return
                    }
                    console.log('initialize msg:', msg.data)
                    gsmModem.checkSimMemory(a => {
                        console.log(a)
                    })
                     // gsmModem add at+qnwinfo (carrier info), and at+qspn (service provider name)  for debug logs
                    gsmModem.setModemMode(async(msgMode,err) => {
                        if (err) {
                            //console.log(`Error Setting Modem Mode - ${err}`);
                            console.log("Gateway", `Error Setting Modem Mode`);
                            // let res = await axios.post(`http://${ip.address()}:${process.env.PORT}/api/createNotification`,{
                            //     subject : `Modem problem`,
                            //     message: `Setting modem to PDU Mode failed, Please try again.`
                            // })

                            // aedes.publish({
                            //     qos: 0,
                            //     topic: '/notification',
                            //     payload: JSON.stringify(res.data.result),
                            //     retain: false
                            // });
                            response.send({status: false, message: 'Error Setting Modem Mode'})
                            // modemStatus = false
                            console.log('Modem status ', modemStatus)
                            gsmModem.close((err) => {
                                console.log('port closed', err);
                            })

                            return
                        } 

                        gsmModem.getOwnNumber(async (msg,err) => {
                            if(err)
                            {
                                console.log("Gateway", `Error getting own number`);
                              
                                response.send({status: false, message: 'Error getting own number'})
                                // modemStatus = false
                                console.log('Modem status ', modemStatus)
                                gsmModem.close((err) => {
                                    console.log('port closed', err);
                                })
                            }
                            else{
                                // console.log("AT+CPMS: ","AT+CPMS=\"SM\",\"SM\",\"SM\"")
                                // gsmModem.executeCommand(`AT+CPMS="SM","SM","SM"`, ((data,err) => {
                                //     if(err)
                                //     {
                                //         console.log('Exec Error: ',err)
                                //     }
                                //     else{
                                //         console.log("Result from execute command: ", data)
                                //         gsmModem.getSimInbox((result, err) => {
                                //             if(err) {
                                //                 console.log(`Failed to get SimInbox ${err}`);
                                //             } else {
                                //                 console.log(`Sim Inbox Result: ${JSON.stringify(result)}`);
                                //             }
                                //         });
                                //     }
                                    
                                // }), false, 30000)
                                gsmModem.getSimInbox((result, err) => {
                                            if(err) {
                                                console.log(`Failed to get SimInbox ${err}`);
                                            } else {
                                                console.log(`Sim Inbox Result: ${JSON.stringify(result)}`);
                                            }
                                        });
                               

                                // console.log(msg)
                                console.log(`Set Mode: ${msgMode.data}`);
                                modemStatus = true
                                console.log('Modem status ', modemStatus)
        
                                let res = await axios.post(`http://${ip.address()}:${process.env.PORT}/api/createNotification`,{
                                    subject : `Modem succesfully connected`,
                                    message: `Modem at ${data.data.modem} status ${data.data.status}`
                                })
                                modemPort = data.data.modem
                                portStatus = true;
                                aedes.publish({
                                    qos: 0,
                                    topic: '/notification',
                                    payload: JSON.stringify(res.data.result),
                                    retain: false
                                });
                                
                                
                                response.send({status: true, message: 'Modem succesfully connected'})
                            }
                        })

                        gsmModem.on('onNewMessage', data => {
                            console.log(data)
                        })

                        gsmModem.on('onNewIncomingCall', result => {
                            console.log(result)
                        })
                 
                    }, "PDU");
        
                    });
               
               
            }
    
        });

    } catch (error) {
        return next(error)
    }

})
app.get('/getModemDetails',  (req,res,next) => {
    
            var details ={ number: null, signal: null}
            if(modemStatus){
                gsmModem.getOwnNumber( (msg,err) => {

                    if (err) {

                        console.log("Gateway", `Error retrieving Signal Strength`);
                       
                        res.send({status: modemStatus})
                        return
                    } else {
                        console.log(msg);
                        gsmModem.getNetworkSignal(async (sigStrength, err) => {
                            if (err) {
                                console.log("Gateway", `Error retrieving Signal Strength`);
                          
                                res.send({status: modemStatus})
                                return
                            } else {
                                
                                res.send({status: modemStatus, comPort: modemPort, number: msg.data.number, sigStrength: sigStrength.data.signalQuality})
                                return
                            }
                        });
                        
                    //    res.send({number: msg.data.number})
                    }  
                })
            }
            else{
                res.send({status: modemStatus})
            }
            
            
        
})
async function getSignal() {
    gsmModem.getNetworkSignal(async (sigStrength, err) => {
        // if (err) {
        //     //console.log(`Error retrieving Signal Strength - ${err}`);
        //     console.log("Gateway", `Error retrieving Signal Strength`);
        //     // details.status = false;
        //     return {
        //         signal: null
        //     }
        // } else {
            console.log(sigStrength);
            // details.signal = sigStrength.data.signalQuality
            // details.status = true;
            // console.log(details.signal)
            return { signal: sigStrength.data.signalQuality}

        // }
    });
}
app.post('/execAtCommand', async (req,res,next) => {
    gsmModem.executeCommand(req.body.command, ((data,err) => {
        if(err)
        {
            console.log('Exec Error: ',err)
            res.send("Error")
        }
        else{
            console.log("Result from execute command: ", data)
            res.send(data)
        }
        // res.send(data)
    }), false, 30000)
})
async function getNumber (){
    gsmModem.getOwnNumber(async (msg,err) => {

        if (err) {
            //console.log(`Error retrieving Signal Strength - ${err}`);
            console.log("Gateway", `Error retrieving Signal Strength`);
            // details.status = false;
            return {number: null}
        } else {
            console.log(msg);
            // details.number = msg.data.number
            // details.status = true;
            // console.log(details)
            return {number: msg}
        }  
})
}
app.post('/sendSMS', async (req,response,next) =>{
    try {
        //send balance 
        if(balanceStatus)
        {
            let res = await sendSMS(req.body.number, req.body.message)
            // console.log(res)
            response.send({'Balance status: ': true})
        }
        else{
            let res = await sendSMS(req.body.number, req.body.message)
            // console.log(res)
            response.send({'Balance status: ': false})
        }

    } catch (error) {
        return next(error)
    }
})

gsmModem.on('onNewMessageIndicator', data => {
//indicator for new message only (sender, timeSent)
    console.log(data)
})

gsmModem.on('onNewMessage', data => {
    //whole message data
    console.log(data)
})
async function sendSMS(number,message){
    let status = false;
    gsmModem.sendSMS(number,message, true, async (response) => {
        console.log("message status: ", response)
        status =  true
        // if (result.status==="Error") {

        //     console.log("Gateway", `Failed to send message: ${result.error}`);
        //     return {
        //         status : false,
        //         message: 'Unable to send message'
        //     }
        // } else {
            
        //     console.log(result)
        //     return {
        //         status: true,
        //         message: `Successfully send to ${number}`
        //     }
        // }
        
    });
    return status;
}

// app.get('/',(req,res)=>{
//     res.send({
//         message: "HELLO WORLD"
//     })
// })

//SERIAL COMMUNICATION

// const sensorPort = new serialPort('COM3', {
//     baudRate: 9600,
// });

// const parser = sensorPort.pipe(new readLine({ delimiter: '\r\n'}));
// parser.on('open', onOpen);

// parser.on('data', async (data) => {

//     console.log(data)
//     // console.log(`${process.env.PORT}`)
//     // console.log(`http://localhost:${process.env.PORT}/getEventByTopic/?topic=/temp2`)
//    try{
//      //Get event by topic/ don't forget to change temp2 dynamically
//     let events = await axios.get(`http://localhost:${process.env.PORT}/api/getEventByTopic/?topic=/temp2`)
//     aedes.publish({
//         qos: 0,
//         topic: '/temp1',
//         payload: data,
//         retain: false
//       });
//     events.data[0].events.forEach(async (element) => {
//             if( element.statement === 'goes more than' )
//                {
    //             if(data > element.value )
    //             {
    //                 //console.log(element.value)
    //                 let res = await axios.post(`http://localhost:${process.env.PORT}/api/createNotification`,{
    //                     subject : `${events.data[0].device_name} is high`,
    //                     message: `${events.data[0].device_name} is ${data} which surpass the maximum threshold ${element.value}`
    //                 })
                
    //                 aedes.publish({
    //                     qos: 0,
    //                     topic: '/notification',
    //                     payload: JSON.stringify(res.data.result),
    //                     retain: false
    //                 });
    //             }
//                }
//             else if( element.statement === 'goes less than' )
//              {
    //             if(data < element.value )
    //             {
    //                 //console.log(element.value)
    //                 let res = await axios.post(`http://localhost:${process.env.PORT}/api/createNotification`,{
    //                     subject : `${events.data[0].device_name} is low`,
    //                     message: `${events.data[0].device_name} is ${data} which lower than the minimum threshold ${element.value}`
    //                 })
                
    //                 aedes.publish({
    //                     qos: 0,
    //                     topic: '/notification',
    //                     payload: JSON.stringify(res.data.result),
    //                     retain: false
    //                 });
    //             }                  
//              }
//       });
//     // let datum = parseInt(data)+2
//     // aedes.publish({
//     //     qos: 0,
//     //     topic: '/temp2',
//     //     payload: datum.toString(),
//     //     retain: false
//     // });
//     // console.log('test')

//    }catch(error){
//         console.log(error)
//    }

    
      
// });
// function onOpen() {
//     console.log('Arduino connected!');
// }

// function random()
// {
    
// }