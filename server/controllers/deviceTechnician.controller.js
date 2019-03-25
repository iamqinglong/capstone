const mongoose = require('mongoose')
const DeviceTechnician = mongoose.model('DeviceTechnician')
const _ = require('lodash')

module.exports.create = (req,res,next) => {
    // res.send('Greetings from the Device controller!');

    let devTech = new DeviceTechnician(
        {
            devId: req.body.devId,
            techId: req.body.techId,
        
        }
    );

    // devTech.save(function (err) {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.send('DeviceTechnician Created successfully')
    // })

    DeviceTechnician.update({devId: devTech.devId, techId: devTech.techId},
        {},
        {'upsert': true},
        function (err, doc) {
            if(err){
                return next(err)
            }
            res.send(doc)
        }
        );
}
