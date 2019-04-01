const mongoose = require('mongoose')
const DeviceTechnician = mongoose.model('DeviceTechnician')
const _ = require('lodash')

module.exports.create = async (req,res,next) => {
    try {
        let devId = mongoose.Types.ObjectId(req.params.id);
        let techIds = req.body.techIds;
        techIds.forEach( async (element) => {
        await DeviceTechnician.findOneAndUpdate({devId: devId, techId: element},
              {},
              {'upsert': true, runValidators: true},
              );
        })

        return res.status(200).send( { status: true, 'message': 'Succesfully added!'}) 
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
