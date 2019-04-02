const mongoose = require('mongoose')
const UserNotification = mongoose.model('UserNotification')
const _ = require('lodash')

module.exports.create = async (req,res,next) => {
    try {

        // let devId = mongoose.Types.ObjectId(req.params.id);
        // let notifId = req.body.notifId;
       

        await UserNotification.findOneAndUpdate({userId: mongoose.Types.ObjectId(req.params.id), notifId: req.body.notifId},
              // {$set: {userId: mongoose.Types.ObjectId(req.params.id), notifId: req.body.notifId}},
              {},
              {'upsert': true},
              );
      
        return res.status(200).send( { status: true, 'message': 'UserNotification succesfully added!'}) 
    } catch (error) {
        return next(error)
    }  
}

module.exports.delete = async (req,res,next) => {
    try {
          let devId = req.body.devId
          let techId = req.body.techId

          const result = await DeviceTechnician.findOneAndDelete({devId: devId, techId: techId});
        
        return res.status(200).send( { status: true, 'message' : `Succesfully deleted!`}) 
    } catch (error) {
        return next(error)
    }  
}
