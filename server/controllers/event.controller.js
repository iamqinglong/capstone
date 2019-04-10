const mongoose = require('mongoose')
const Device = mongoose.model('Device')
const DeviceTechnician = mongoose.model('DeviceTechnician')
const Technician = mongoose.model('Technician')
const Event = mongoose.model('Event')
const DeviceEvent = mongoose.model('DeviceEvent')

var Schema = mongoose.Schema;
const _ = require('lodash')

module.exports.create = async (req,res,next) => {

    try {
          
      let query = await Event.aggregate([

        { '$lookup': { 'from': DeviceEvent.collection.name,
          let: {'id': '$_id','cond':'$condition','state':'$statement','val':'$value'},
                  pipeline: [
                {
                  $match: {
                    $expr: {
                      // Weird but `$expr` must have exactly one key, so you need to
                      // use `$and`, otherwise you get an error 'MongoError: An
                      // object representing an expression must have exactly one field'
                      $and: [
                        // Fields prefixed with one '$' are in the 'Stock' collection,
                        // that is, the `from` collection. Fields prefixed with '$$'
                        // are from the `let` above
                        { $eq: ['$evId', '$$id']},
                        { $eq: ['$$cond', req.body.condition]},
                        { $eq: ['$$state', req.body.statement]},
                        { $eq: ['$$val', parseInt( req.body.value) 
                      ]},
                        { $eq: ['$devId', mongoose.Types.ObjectId(req.params.id)] },
                      ]
                    }
                  }
                }
              ],
          'as': 'events'
        }},

        {
          $unwind: {
              path: "$events",
              // preserveNullAndEmptyArrays: true
          }
        },
        // {
        //   $match: { "events": { $eq: [] } }
        // },
  
        { '$group': {
          '_id': '$_id',
          'condition': { '$first': '$condition' },
          'statement': { '$first': '$statement' },
          'value': { '$first': '$value' },
          'action': { '$first': '$action' },
        }}
      ]);
      if(query === undefined || query.length == 0)
      {
          let event = new Event({
              condition: req.body.condition,
              statement: req.body.statement,
              value: req.body.value,
              action: req.body.action,
          });

          await event.save(async (err,event) => {
              let id = event._id
              
             await DeviceEvent.findOneAndUpdate({devId: mongoose.Types.ObjectId(req.params.id), evId: id},
              {},
              {'upsert': true},
              function (err, doc) {
                  if(err){
                      return next(err)
                  }
              }
              );
            return res.status(200).send({status: true , 'message':`Event succesfully created!`})
          })
      }
      else
      {
        return res.status(200).send({status: false , 'message':`The event was already exist, It probably the value.`})
      }
      // query.exec((err, event) => {
        
      //   return res.status(200).send(  event )
      // })
        //   let result = await Event.findOne({
        //     condition: req.body.condition,
        //     statement: req.body.statement,
        //     value: req.body.value,
        //     action: req.body.action,})
          
        // if(result == null)
        // {
          
        //   let event = new Event({
        //       condition: req.body.condition,
        //       statement: req.body.statement,
        //       value: req.body.value,
        //       action: req.body.action,
        //   });

        //   await event.save(async (err,event) => {
        //       let id = event._id
              
        //      await DeviceEvent.findOneAndUpdate({devId: mongoose.Types.ObjectId(req.params.id), evId: id},
        //       {},
        //       {'upsert': true},
        //       function (err, doc) {
        //           if(err){
        //               return next(err)
        //           }
        //       }
        //       );
        //     return res.status(200).send({status: true , 'message':`Event succesfully created!`})
        //   })
          
        // }
        // else{
        //   return res.status(200).send({status: false , 'message':`The event was already exist, It probably the value.`})
        // }


          
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
        'from': DeviceEvent.collection.name,
        'localField': '_id',
        'foreignField': 'devId',
        'as': 'events'
      }},
      { '$unwind': '$events' },
      { '$lookup': {
          'from': Event.collection.name,
          'localField': 'events.evId',
          'foreignField': '_id',
          'as': 'events',
        }
      },
      { '$unwind': '$events' },
      {
        "$addFields": 
          {
              "events.statement": {
                  $concat: ['$device_name',' ','$events.statement']
              },
          },
      },
      
         { '$group': {
        '_id': '$_id',
        'device_name': { '$first': '$device_name' },
        'events': { '$push': '$events' }
      }}
      ]);
      query.exec((err, device) => {
        return res.status(200).send(  device )
    })
  } catch (error) {
      // res.status(500).send(error)
      return next(error)
  }
 
}

module.exports.delete = async (req, res, next) => {

  try {

      await DeviceEvent.findOneAndDelete({ devId : req.body.devId, evId: req.body.evId}).exec();
      await Event.findByIdAndDelete(req.body.evId).exec();
      return res.status(200).json({ status: true, 'message': 'Event deleted succesfully!'})
     
  } catch (error) {
      // res.status(500).send(error)
      return next(error)
  }
 
}

module.exports.get = async (req, res, next) => {
  try {
      let result = await Event.findOne({_id: req.params.id}).exec();
      return res.status(200).json({ status: true, result})
  } catch (error) {
    
  }
}

module.exports.update = async ( req, res, next ) => {
  try {

    let query = await Event.aggregate([
      { '$lookup': { 'from': DeviceEvent.collection.name,
        let: {'id': '$_id','cond':'$condition','state':'$statement','val':'$value'},
                pipeline: [
              {
                $match: {
                  $expr: {
                    // Weird but `$expr` must have exactly one key, so you need to
                    // use `$and`, otherwise you get an error 'MongoError: An
                    // object representing an expression must have exactly one field'
                    $and: [
                      // Fields prefixed with one '$' are in the 'Stock' collection,
                      // that is, the `from` collection. Fields prefixed with '$$'
                      // are from the `let` above
                      { $eq: ['$$cond', req.body.condition]},
                      { $eq: ['$$state', req.body.statement]},
                      { $eq: ['$$val', parseInt( req.body.value)]},
                      { $eq: ['$evId', mongoose.Types.ObjectId(req.body.id)]},
                      { $eq: ['$devId', mongoose.Types.ObjectId(req.params.id)] }
                    ]
                  }
                }
              }
            ],
        'as': 'events'
      }},
      {
        $unwind: {
            path: "$events",
        }
      },

    ]);

    if(query === undefined || query.length == 0)
    {
    
      const event = {
              condition: req.body.condition,
              statement: req.body.statement,
              value: req.body.value,
              action: req.body.action
      }
      const { ...updateData } = event
      const update = await Event.findOneAndUpdate(
        {_id:mongoose.Types.ObjectId(req.body.id)},
        {$set: updateData},
        {'upsert': true})
      
      return res.status(200).send( {status: true, 'message': `Event updated successfully`} )
    }
    else
    {
      return res.status(200).send( {status:false, 'message': `The event was already exist, It probably the value.`} )
    }
  } catch (error) {
    
  }
}

module.exports.getAllByTopic = async (req, res,next) => {

  try {
      // res.send(req.query.topic)
      let device = await Device.aggregate([
      {
        '$match': { data_source : req.query.topic }
      },
      { '$lookup': {
        'from': DeviceEvent.collection.name,
        'localField': '_id',
        'foreignField': 'devId',
        'as': 'events'
      }},
      { '$unwind': '$events' },
      { '$lookup': {
          'from': Event.collection.name,
          'localField': 'events.evId',
          'foreignField': '_id',
          'as': 'events',
        }
      },
      { '$unwind': '$events' },
      {
        "$addFields": 
          {
              "events.statement": {
                  $concat: ['$device_name',' ','$events.statement']
              },
          },
      },
      
         { '$group': {
        '_id': '$_id',
        'device_name': { '$first': '$device_name' },
        'events': { '$push': '$events' }
      }}
      ]);
    //   query.exec((err, device) => {
    //     return res.status(200).send(  device )
    // })
    return res.status(200).send( device )
  } catch (error) {
      // res.status(500).send(error)
      return next(error)
  }
 
}