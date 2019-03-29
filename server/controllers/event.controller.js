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

module.exports.getAll = async (req, res,next) => {

  try {

       let query =  Device.aggregate([
      {
        '$match': { _id : mongoose.Types.ObjectId(req.params.id) }
      },
      { '$lookup': {
        'from': DeviceTechnician.collection.name,
        'localField': '_id',
        'foreignField': 'devId',
        'as': 'technicians'
      }},
      { '$unwind': '$events' },
      { '$lookup': {
          'from': Event.collection.name,
          'localField': 'technicians.evId',
          'foreignField': '_id',
          'as': 'events',
        }
      },
      { '$unwind': '$events' },
         { '$group': {
        '_id': '$_id',
        'device_name': { '$first': '$device_name' },
        'technicians': { '$push': '$technicians' }
      }}
      ]);
      query.exec((err, device) => {
        return res.status(200).send( device )
    })
  } catch (error) {
      // res.status(500).send(error)
      return next(error)
  }
 
}

