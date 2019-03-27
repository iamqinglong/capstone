// const UserModel = require('../models/user.model');
const mongoose = require('mongoose')
const Technician = mongoose.model('Technician')
const Device = mongoose.model('Device')
const DeviceTechnician = mongoose.model('DeviceTechnician')

const passport = require('passport')
const _ = require('lodash')

module.exports.create = async (req,res,next) => {
    // res.send('Greetings from the Device controller!');

    // let tech = new Technician(
    //     {

    //         first_name: req.body.first_name,
    //         last_name: req.body.last_name,
    //         phone_number: req.body.phone,

    //     }
    // );

    // tech.save(function (err) {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.send('Technician Created successfully')
    // })
    try {
        let tech = new Technician(
            {
    
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone_number: req.body.phone,
    
            }
        );
        await tech.save()
        return res.status(200).send({status: true , 'message':`${req.body.first_name} Created successfully`})
  } catch (error) {
    
    return next(error)
  }
    
}


module.exports.get = async (req, res, next) => {
    // const query = Technician.findById(req.params.id).populate('devices')

    // query.exec((err, technicians) => {
    //     return res.status(200).json( { technicians, device: technicians.devices })
    // })
    // try {

    //     let technician = await Technician.find({ _id: mongoose.Types.ObjectId(req.params.id)}).limit(1).exec();
    //     if(technician.length)
    //     {
    //       res.status(200).send( {status: true, technician } )
    //     }
    //     else res.status(404).send( {status: false, 'message': 'Technician not found'})
        
  
    //   } catch (error) {
  
        
    //     return next(error)
  
    //   }
        try {
            let query = Technician.aggregate([
                {
                    '$match': { _id : mongoose.Types.ObjectId(req.params.id) }
                },
                {
                    
                "$addFields": {
                    "first_name": {
                        "$reduce": {
                            "input": {
                            "$map": {
                                "input": {
                                    "$split": [
                                        "$first_name",
                                        " "
                                    ]
                                },
                                "in": {
                                    "$concat": [
                                        {
                                        "$toUpper": {
                                            "$substrCP": [
                                                "$$this",
                                                0,
                                                1
                                            ]
                                        }
                                        },
                                        {
                                        "$toLower": {
                                            "$substrCP": [
                                                "$$this",
                                                1,
                                                { "$strLenCP": "$$this" }
                                            ]
                                        }
                                        }
                                    ]
                                }
                            }
                            },
                            "initialValue": "",
                            "in": {
                            "$concat": [
                                "$$value",
                                " ",
                                "$$this"
                            ]
                            }
                        }
                    },
                    "last_name": {
                        "$reduce": {
                            "input": {
                            "$map": {
                                "input": {
                                    "$split": [
                                        "$last_name",
                                        " "
                                    ]
                                },
                                "in": {
                                    "$concat": [
                                        {
                                        "$toUpper": {
                                            "$substrCP": [
                                                "$$this",
                                                0,
                                                1
                                            ]
                                        }
                                        },
                                        {
                                        "$toLower": {
                                            "$substrCP": [
                                                "$$this",
                                                1,
                                                { "$strLenCP": "$$this" }
                                            ]
                                        }
                                        }
                                    ]
                                }
                            }
                            },
                            "initialValue": "",
                            "in": {
                            "$concat": [
                                "$$value",
                                " ",
                                "$$this"
                            ]
                            }
                        }
                    },
                },
                }
            ]
        )
        query.exec((err, technician) => {
            return res.status(200).json( {status: true, technician } )
        })
        } catch (error) {
            return next(error)
        }
}

module.exports.getAll = async (req, res,next) => {

    // try {
    //     let query = await Technician.find().exec();
    //     return res.status(200).send( query )
    // } catch (error) {
    //     // res.status(500).send(error)
    //     return next(error)
    // }
    try {
        let query = Technician.aggregate([
            {
                
            "$addFields": {
                "first_name": {
                    "$reduce": {
                        "input": {
                        "$map": {
                            "input": {
                                "$split": [
                                    "$first_name",
                                    " "
                                ]
                            },
                            "in": {
                                "$concat": [
                                    {
                                    "$toUpper": {
                                        "$substrCP": [
                                            "$$this",
                                            0,
                                            1
                                        ]
                                    }
                                    },
                                    {
                                    "$toLower": {
                                        "$substrCP": [
                                            "$$this",
                                            1,
                                            { "$strLenCP": "$$this" }
                                        ]
                                    }
                                    }
                                ]
                            }
                        }
                        },
                        "initialValue": "",
                        "in": {
                        "$concat": [
                            "$$value",
                            " ",
                            "$$this"
                        ]
                        }
                    }
                },
                "last_name": {
                    "$reduce": {
                        "input": {
                        "$map": {
                            "input": {
                                "$split": [
                                    "$last_name",
                                    " "
                                ]
                            },
                            "in": {
                                "$concat": [
                                    {
                                    "$toUpper": {
                                        "$substrCP": [
                                            "$$this",
                                            0,
                                            1
                                        ]
                                    }
                                    },
                                    {
                                    "$toLower": {
                                        "$substrCP": [
                                            "$$this",
                                            1,
                                            { "$strLenCP": "$$this" }
                                        ]
                                    }
                                    }
                                ]
                            }
                        }
                        },
                        "initialValue": "",
                        "in": {
                        "$concat": [
                            "$$value",
                            " ",
                            "$$this"
                        ]
                        }
                    }
                },
            },
            }
        ]
    )
    query.exec((err, technician) => {
        return res.status(200).json( technician )
    })
    } catch (error) {
        return next(error)
    }
   
  }

module.exports.getTechDev = async (req, res,next) => {

try {
    
    let query =  Technician.aggregate([
    {
        '$match': { _id : mongoose.Types.ObjectId(req.params.id) }
    },
    { '$lookup': {
        'from': DeviceTechnician.collection.name,
        'localField': '_id',
        'foreignField': 'techId',
        'as': 'devices'
    }},
    { '$unwind': '$devices' },
    { '$lookup': {
        'from': Device.collection.name,
        'localField': 'devices.devId',
        'foreignField': '_id',
        'as': 'devices'
    }},
    { '$unwind': '$devices' },
    { '$group': {
        '_id': '$_id',
        'first_name': { '$first': '$first_name' },
        'devices': { '$push': '$devices' }
    }}
    ]);
    
    // return res.status(200).send( { device, technicians: device.technicians })
    query.exec((err, technician) => {
        return res.status(200).json( technician )
    })
} catch (error) {
    // res.status(500).send({error, 'message' : 'Sorry, error on updating!'})
    return next(error)
}

}

module.exports.update = async (req, res,next) => {

    // try {

    //     let result =  await Technician.findByIdAndUpdate(req.params.id,
    //         {
    //         first_name: req.body.first_name,
    //         last_name: req.body.last_name,
    //         phone_number: req.body.phone

    //         }).exec();
    //     // var technician = await Technician.findById(req.params.id).exec();
    //     // technician.set(req.body);
    //     // var result = await technician.save();
    //     // res.status(200).send(result);
    //     if(result == null)
    //     {
    //         res.status(404).send({status: false,   'message' : 'Technician to update not found'})
    //     }
    //     return res.status(200).json( result )
    // } catch (error) {
    //     // res.status(500).send({error, 'message' : 'Sorry, error on updating!'})
    //     return next(error)
    // }
    try {
      const id = req.params.id
      const technician = req.body
      const { ...updateData } = technician
      const update = await Technician.update({_id:id},{$set: updateData}, { new: true, runValidators: true, context: 'query' })
      return res.status(200).send( update )
      
  } catch (error) {
     
      return next(error)
  }

}

module.exports.delete = async (req, res,next) => {
  
    try {
      
        let result = await DeviceTechnician.findOne({ techId: req.params.id})
        // res.status(200).send(result)
          if(result == null)
          {
            
             let query = await Technician.findByIdAndDelete(req.params.id).exec();
            //  res.status(200).send(query)
             return res.status(200).json({ status: true, 'message': 'Deleted Succesfully!'})
          }
          else{
              return res.status(200).json({ status: false, 'message': 'Ops! cannot be deleted '})
          }
       
        
        
    } catch (error) {

      // res.status(500).send({ status: false , 'message': 'Sorry error in deleting'})
      return next(error)

    }
}