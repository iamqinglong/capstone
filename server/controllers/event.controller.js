const mongoose = require('mongoose')
const Device = mongoose.model('Device')
const DeviceTechnician = mongoose.model('DeviceTechnician')
const Technician = mongoose.model('Technician')
const Event = mongoose.model('Event')
const DeviceEvent = mongoose.model('DeviceEvent')

var Schema = mongoose.Schema;
const _ = require('lodash')

module.exports.create = async (req,res,next) => {
    // res.send('Greetings from the Device controller!');

    try {
          let event = new Event({
              condition: req.body.condition,
              statement: req.body.statement,
              value: req.body.value,
              action: req.body.action,
          });
          await event.save(function (err,event) {
              let id = event._id
              
              DeviceEvent.update({devId: mongoose.Types.ObjectId(req.params.id), evId: id},
              {'upsert': true},
              function (err, doc) {
                  if(err){
                      return next(err)
                  }
                  // res.send(doc)
              }
              );
          })

          return res.status(200).send({status: true , 'message':`Event Created successfully`})
    } catch (error) {

      return next(error)
    }
    
    
}