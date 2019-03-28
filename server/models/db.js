const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true,useCreateIndex: true,},
    (err) => {
    if(!err){ console.log(`Mongodb connection succeeded `)}
    else { console.log('Error Mongodb connection: ')}
})

require('./user.model')
require('./device.model')
require('./technician.model')
require('./deviceTechnician.model')
require('./deviceEvent.model')
require('./event.model')



