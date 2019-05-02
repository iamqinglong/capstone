let serialportgsm = require('serialport-gsm')
const serialPort="COM4"; // serial port for mac
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
            incomingSMSIndication: true,
            customInitCommand: "AT+CNMI=?",
            // onNewMessage:true,
            // autoOpen: true,
            logger: console,
        }

   

module.exports.openModem = () => { 
    gsmModem.open(serialPort, options, (err) => {
		if (err) {
            console.log("Gateway", `Error opening modem`);
        }
        else{

            gsmModem.initializeModem((msg,err) => 
            {
                if(err)
                {
                    console.log("Initialize Modem Failed")
                    // return next(err)
                }
                else
                {
                    console.log('initialize msg:', msg.data)

                       // gsmModem add at+qnwinfo (carrier info), and at+qspn (service provider name)  for debug logs
                        gsmModem.setModemMode((msg,err) => {
                            if (err) {
                                //console.log(`Error Setting Modem Mode - ${err}`);
                                console.log("Gateway", `Error Setting Modem Mode`);
                                // return next(err)
                            } else {
                                console.log(`Set Mode: ${msg.data}`);
                            }	
                        }, "PDU");
                }
            });
         

           
            // return res.send({status: false, message: 'Modem succesfully connected'})
        }

    });
    // gsmModem.open(serialPort, options,async (err,data) => {
    //     if (err) {
    //         console.log(`Error opening modem`);
    //     }
    //     else{

    //         gsmModem.initializeModem(async (msg,err) => 
    //         {
    //             if(err)
    //             {
                   
    //                 console.log("Initialize Modem Failed")

    //             }
    //             else{
    //                 // gsmModem add at+qnwinfo (carrier info), and at+qspn (service provider name)  for debug logs
    //                 gsmModem.setModemMode(async(msgMode,err) => {
    //                     if (err) {
    //                         //console.log(`Error Setting Modem Mode - ${err}`);
    //                         console.log("Gateway", `Error Setting Modem Mode`);
                        
                        
    //                     } 

    //                     gsmModem.getOwnNumber(async (msg,err) => {
    //                         if(err)
    //                         {
    //                             console.log("Gateway", `Error getting own number`);
                
    //                         }
    //                         else{
                            
    //                             gsmModem.getSimInbox((result, err) => {
    //                                 if(err) {
    //                                     console.log(`Failed to get SimInbox ${err}`);
    //                                 } else {
    //                                     console.log(`Sim Inbox Result: ${JSON.stringify(result)}`);
    //                                 }
    //                             });

    //                             console.log(msg)
                              
    //                         }
    //                     })
                
    //                 }, "PDU");
    //             }
    //             });
           
           
    //     }

    // });
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

module.exports.executeCommand = async (req,res,next) => {
    try {
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
    } catch (error) {
        return next(error)
    }
}
gsmModem.on('open', result => { 
    console.log('on open result: ',result)
 })
gsmModem.on('close', msg => console.log('on close msg:' , msg));

gsmModem.on('error',  msg => console.log('on error msg:' , msg));

gsmModem.on('onNewMessageIndicator', data => {
    //indicator for new message only (sender, timeSent)
     console.log(data)
   })
   
gsmModem.on('onNewMessage', data => {
    //whole message data
    console.log(data)
})