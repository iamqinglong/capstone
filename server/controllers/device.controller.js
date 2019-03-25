const mongoose = require('mongoose')
const Device = mongoose.model('Device')
const DeviceTechnician = mongoose.model('DeviceTechnician')
const Technician = mongoose.model('Technician')
var Schema = mongoose.Schema;
const _ = require('lodash')

module.exports.create = async (req,res,next) => {
    // res.send('Greetings from the Device controller!');

    try {
          let device = new Device({
              device_name: req.body.device_name,
              data_source: req.body.data_source,
              location: req.body.location,
          });
          await device.save()
          return res.status(200).send({status: true , 'message':`${req.body.device_name} Created successfully`})
    } catch (error) {
      if(error.code == 11000)
      {
        return res.status(422).send({status: false , 'device_name':'Already exist, Please try another'})
      }

      return next(error)
    }
    // let device = new Device(
    //     {
    //         device_name: req.body.device_name,
    //         data_source: req.body.data_source,
    //         location: req.body.location,

    //     }
    // );

    // device.save(function (err) {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.send('Device Created successfully')
    // })
    
}

module.exports.get = async (req, res, next) => {
   
    // let query = Device.findById(req.params.id).populate({
    //   path: 'technicians',
    //   populate: { path: 'techId' }
    // });
    
  
    // query.exec((err, device) => {
    //     return res.status(200).json( { device, technicians: device.technicians })
    // })
    
    //  let query =  Device.aggregate([
    //   { '$lookup': {
    //     'from': DeviceTechnician.collection.name,
    //     'localField': '_id',
    //     'foreignField': 'devId',
    //     'as': 'technicians'
    //   }},
    //   { '$unwind': '$technicians' },
    //   { '$lookup': {
    //     'from': Technician.collection.name,
    //     'localField': 'technicians.techId',
    //     'foreignField': '_id',
    //     'as': 'technicians'
    //   }},
    //   { '$unwind': '$technicians' },
    //   { '$group': {
    //     '_id': '$_id',
    //     'device_name': { '$first': '$device_name' },
    //     'technicians': { '$push': '$technicians' }
    //   }}
    // ]);

    //  query.exec((err, device) => {
    //     return res.status(200).json( { device, technicians: device.technicians })
    // })
    try {

      let device = await Device.find({ _id: mongoose.Types.ObjectId(req.params.id)}).limit(1).exec();
      if(device.length)
      {
        res.status(200).send({status: true, device } )
      }
      else res.status(404).send( {status: false, 'message': 'Device not found'})
      

    } catch (error) {

      // res.status(500).send({error, 'message': 'Device not found'})
      return next(error)

    }
  

}

module.exports.getAll = async (req, res,next) => {

  try {
      let query = await Device.find().exec();
      return res.status(200).send( query )
  } catch (error) {
      // res.status(500).send(error)
      return next(error)
  }
 
}

module.exports.delete = async (req, res,next) => {
  
    try {
      
        let result = await DeviceTechnician.findOne({ devId : req.params.id})
    
          if(result == null)
          {
            // res.send('is null')
             let query = await Device.findByIdAndDelete(req.params.id).exec();
             return res.status(200).json({ status: true, 'message': 'Deleted Succesfully!'})
          }
          else{
              return res.status(200).json({ status: false, 'message': `Ops! cannot be deleted, It's already in used.`})
          }
       
        
        
    } catch (error) {

      // res.status(500).send({ status: false , 'message': 'Sorry error in deleting'})
      return next(error)

    }

    // DeviceTechnician.findOne({ devId : req.params.id}, function(err, devtech){
    //   if(err) return next(err)

    //   if(devtech == null)
    //   {
    //      let query =  Device.findByIdAndDelete(req.params.id);
    //      query.exec(function(err, devices) {
    //       if (err) {
    //         return next(err)
    //       }
       
    //       return res.status(200).json({ status: true, 'message': 'Deleted Succesfully!'})
    //     });  
          
    //   }
    //   else{
    //     return res.status(200).json({ status: false, 'message': 'Ops! cannot be deleted '})
    //   }
      
    // })
  
}

module.exports.update = async (req, res,next) => {

  try {
      const id = req.params.id
      const device = req.body
      const { ...updateData } = device
      const update = await Device.update({_id:id},{$set: updateData}, { new: true, runValidators: true, context: 'query' })
      // const update = await Device.findOneAndUpdate(id, updateData, { new: true, runValidators: true, context: 'query' })
      return res.status(200).send( update )
      // let result = await Device.findOneAndUpdate(req.params.id,
      //   {

      //     device_name: req.body.device_name,
      //     data_source: req.body.data_source,
      //     location: req.body.location

      //   },
      //   { runValidators: true, context: 'query' }
      //   );
      
      // if(result == null)
      // {
      //   return res.status(404).send({status: false, 'message' : 'Device to update not found'})
      // }
      // return res.status(200).send( result )
  } catch (error) {
      // res.status(500).send({error, 'message' : 'Sorry, error on updating!'})
      if(error.code == 11000)
      {
        return res.status(422).send({status: false, 'device_name' : 'Device name is already acquired'})
      }
      return next(error)
  }
 
}

module.exports.getDevTech = async (req, res,next) => {

  try {
    //   let query = Device.findById(req.params.id).populate({path: 'technicians', populate: { path: 'techId' }});
    // // let query = Device.findById(req.params.id).populate('technicians');
    
    // query.exec((err, device) => {
    //     return res.status(200).json( { technicians: device.technicians })
    //     // return res.status(200).json( {status: true, 
    //     //   technicians: _.pick(device.technicians,
    //     //     ['_id','firstName','lastName','phone_number'])})
    // })
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
      { '$unwind': '$technicians' },
      { '$lookup': {
        'from': Technician.collection.name,
        'localField': 'technicians.techId',
        'foreignField': '_id',
        'as': 'technicians'
      }},
      { '$unwind': '$technicians' },
      { '$group': {
        '_id': '$_id',
        'device_name': { '$first': '$device_name' },
        'technicians': { '$push': '$technicians' }
      }}
    ]);
    
    // return res.status(200).send( { device, technicians: device.technicians })
     query.exec((err, device) => {
        return res.status(200).json( device )
    })
  } catch (error) {
      // res.status(500).send({error, 'message' : 'Sorry, error on updating!'})
      return next(error)
  }
 
}

