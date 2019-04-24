// let serialportgsm = require('serialport-gsm')

// let modem = serialportgsm.Modem()
// let options = {
//     baudRate: 115200,
//     dataBits: 8,
//     parity: 'none',
//     stopBits: 1,
//     flowControl: false,
//     xon: false,
//     rtscts: false,
//     xoff: false,
//     xany: false,
//     buffersize: 0,
//     autoDeleteOnReceive: true,
//     enableConcatenation: true,
//     incomingCallIndication: true
   
// }
// modem.open('COM4', options, (data,err,msg)=>{console.log('Opened ',data)});
// modem.on('open', () => {
//     modem.initializeModem((msg) => {console.log('initialize msg:', msg)});
//     modem.setModemMode((msg) => {console.log('set pdu msg:', msg)}, 'PDU');
//     // modem.sendSMS('+639972287458', `Hello there zab!`, false, function (response) {
//     //     console.log('message status', response)
//     // })
// });

// modem.sendSMS('+639972287458', `Hello there zab!`, false, function (response) {
//     console.log('message status', response)
// })
// modem.on('close', msg => console.log('on close msg:' , msg));

// modem.on('error',  msg => console.log('on error msg:' , msg));

// module.exports = modem

let serialportgsm = require('serialport-gsm')
const serialPort="COM4"; // serial port for mac
const aedes = require('aedes')()
var gsmModem = serialportgsm.Modem();
let options = {
    baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    xon: false,
    rtscts: false,
    xoff: false,
    xany: false,
    autoDeleteOnReceive: true,
    enableConcatenation: true,
    incomingCallIndication: true
}

   

module.exports.openModem = (req,res,next) => { 
    gsmModem.open(req.body.modemPort, options, (err) => {
		if (err) {
            console.log("Gateway", `Error opening modem`);
            // return res.send({status: false, message: 'Error opening modem'})
            return next(err)
        }
        else{

            gsmModem.initializeModem((msg,err) => 
            {
                if(err)
                {
                    console.log("Initialize Modem Failed")
                    return next(err)
                }
                else
                {
                    console.log('initialize msg:', msg.data)
                }
            });
            // gsmModem add at+qnwinfo (carrier info), and at+qspn (service provider name)  for debug logs
            gsmModem.setModemMode((msg,err) => {
                if (err) {
                    //console.log(`Error Setting Modem Mode - ${err}`);
                    console.log("Gateway", `Error Setting Modem Mode`);
                    return next(err)
                } else {
                    console.log(`Set Mode: ${msg.data}`);
                }	
            }, "PDU");
            return res.send({status: false, message: 'Modem succesfully connected'})
            // // capture signal strength for the logs
            // gsmModem.getNetworkSignal((sigStrength, err) => {
            //     if (err) {
            //         //console.log(`Error retrieving Signal Strength - ${err}`);
            //         console.log("Gateway", `Error retrieving Signal Strength`);
            //         return next(err)
            //     } else {
            //         console.log(`Signal Strength = ${sigStrength.data.signalQuality}`);
            //     }
            // });
            
            // gsmModem.getOwnNumber((msg,err) => {
            //     if (err) {
            //         //console.log(`Error retrieving Signal Strength - ${err}`);
            //         console.log("Gateway", `Error retrieving Own Number`);
            //         return next(err)
            //     } else {
            //         console.log(`Signal Strength = ${sigStrength.data.signalQuality}`);
            //     }
            //     console.log(msg)})
        }

    });
}


module.exports.sendSMS = async (number,message) => {
    try {   
            gsmModem.sendSMS(number,message, false, (result) => {
                if (result.status==="Error") {

                    console.log("Gateway", `Failed to send message: ${result.error}`);
                } else {
                    
                    console.log(result)
                    
                }
                
            });
        

    } catch (error) {
        return next(error)   
    }
}
gsmModem.on('open', result => { 
    console.log('on open result: ',result)
    let msg = {
        subject: 'This is test from sms port'
    }
    aedes.publish({
        qos: 0,
        topic: '/notification',
        payload: JSON.stringify(msg),
        retain: true
    });
 })
gsmModem.on('close', msg => console.log('on close msg:' , msg));

gsmModem.on('error',  msg => console.log('on error msg:' , msg));