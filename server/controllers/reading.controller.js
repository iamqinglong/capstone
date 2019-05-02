const mongoose = require('mongoose')
const Reading = mongoose.model('Reading')
// const DeviceTechnician = mongoose.model('DeviceTechnician')
// const Technician = mongoose.model('Technician')
var Schema = mongoose.Schema;
// const moment = require('moment-timezone')
const _ = require('lodash')
const moment =  require('moment')

module.exports.insert = async (req,res,next) => {
    try {
      
        var dt = new Date()
        dt.setHours(0,0,0,0)
        var time = new Date();
        time.setHours(time.getHours()+8)
        time -= time.getTime() % 1000
        
        let sample = [[time, parseInt(req.body.value)]]
        console.log('first: ', sample[0][0])
        await Reading.findOneAndUpdate(
                {
                    // device_id: req.body.device_id, 
                topic: req.body.topic,
                nsamples:{$lt:5},
                day: dt.toString()},
                {$push:{samples:sample},
                $min:{first:sample[0][0]},
                $max:{last:sample[0][0]},
                $inc:{nsamples:1}},{upsert:true} 
              );
    

        return res.status(200).send( { status: true, 'message': 'Reading successfully inserted!'}) 
    } catch (error) {
        return next(error)
    }  
}

module.exports.get = async (req, res, next) => {
    try {
        
        // var dt = new Date()
        // dt.setHours(0)
        // dt.setMinutes(0)
        // dt.setSeconds(0);
        // dt.setMilliseconds(0);
        // let day = dt.toISOString()
        // let reading = await Reading.aggregate ([
        //      { $match: { "day": { $eq: new Date(day) } } }
        //     ])
        let reading = await Reading.aggregate (
            [ {$match: {
                $or:[
                    {"first": {
                    $gte:
                    new Date('2019-04-13T14:00:02.002+00:00')}},
                    { "last": {
                    $lte:
                    new Date('2019-04-14T14:00:28.452+00:00')}}
                ]}
                }, 
                {$unwind: {path: "$samples"}}, 
                {$match: {
                    "samples.time": {
                    $gte:
                    new Date('2019-04-14T14:00:02.002+00:00'),
                    $lt:
                    new Date('2019-04-14T14:00:28.452+00:00')}
                }},
                {$group :{
                    "_id": "$_id",
                    "day": { '$first': '$day' },
                    // "device_id": { '$first': '$device_id' },
                    "topic": { '$first': '$topic' },
                    "first": { '$first': '$first' },
                    "last": { '$first': '$last' },
                    "nsamples": { '$first': '$nsamples' },
                    "samples": {'$push': '$samples' }
                }}
            ])
            
            return res.status(200).send( reading ) 
    } catch (error) {
        return next(error)
    }
}

module.exports.getByTopic = async (req, res, next) => {
    try {
        let from = new Date(req.body.from)
        let to = new Date(req.body.to)
        from.setHours(from.getHours()+8)
        to.setHours(to.getHours()+8)
        console.log("From: ", from)
        console.log("To: ", to)
        let reading = await Reading.aggregate ([
                {$match: {
                     "topic": { $in: req.body.topics },
                    // $and:[
                    //     { "topic": { $in: req.body.topics }, },
                    //     {"first": {$gte: '2019-04-14T15:37:44.542+00:00'} },
                    //     { "last": {$lte: '2019-04-14T15:37:52.724+00:00'} }
                    // ]}
                    $or:[
                        {"first": {$gte:new Date(req.body.from)}},
                        { "last": {$lte:new Date(req.body.to)}}
                    ],}
                },
                {$unwind: {path: "$samples"}},
                {
                    $project:
                    {
                        "topic": '$topic',
                        "first": '$first',
                        "last":  '$last',
                        "samples": '$samples',
                        'time': { $arrayElemAt: [ "$samples", 0 ] },
                        'val': { $arrayElemAt: [ "$samples", 1 ] },
                    }
                },
                {$match: {
                        "time": {
                            $gte: from.getTime(),
                            $lte: to.getTime()}
                        }
                },
                // {$addFields: {
                //         "avg": {
                //             $avg: '$val'
                //         },
                //         "min": {
                //             $min: '$val'
                //         },
                //         "max": {
                //             $max: 'val'
                //         }
                // }},
                // {$unwind: {path: "$samples"}},
                // {$match: {
                //     $or:[
                //         {"first": {$gte: '2019-04-14T15:37:44.542+00:00'} },
                //         { "last": {$lte: '2019-04-14T15:37:52.724+00:00'} }
                //     ]}
                //     // $or:[
                //     //     {"first": {$gte:new Date(req.body.from)}},
                //     //     { "last": {$lte:new Date(req.body.to)}}
                //     // ],}
                // }, 
                // {$unwind: {path: "$samples"}},
                // {$sort: {'topic': -1}}, 
                // // {$unwind: {path: "$samples"}},
                {$group :{
                    "_id":  '$topic' ,
                    "first": { '$first': '$first' },
                    "last": { '$first': '$last' },
                    "avg": {
                        $avg: '$val'
                    },
                    "min": {
                        $min: '$val'
                    },
                    "max": {
                        $max: '$val'
                    },
                    "reading": {'$push': '$samples'} ,
                }}
            ])
        // let temp = JSON.parse(req.body.topics)
        return res.status(200).send( reading ) 
    } catch (error) {
        return next(error)
    }
}

module.exports.insertDummy = async (req,res,next) => {
    try {
      
        var dt = new Date('January 1, 2018 00:00:00')
        // dt.setHours(0,0,0,0)
        var time = new Date();
        time.setHours(time.getHours()+8)
        time -= time.getTime() % 1000

        let sample = [[time, parseInt(req.body.value)]]
        await Reading.findOneAndUpdate(
                {device_id: req.body.device_id, 
                topic: req.body.topic,
                nsamples:{$lt:200},
                day: dt.toString()},
                {$push:{samples:sample},
                $min:{first:sample[0][0]},
                $max:{last:sample[0][0]},
                $inc:{nsamples:1}},{upsert:true} 
              );
    

        return res.status(200).send( { status: true, 'message': 'Reading successfully inserted!'}) 
    } catch (error) {
        return next(error)
    }  
}

module.exports.getAvgMaxMinByTopic = async (req,res,next) => {
    try {
        
            let from = moment().startOf('day').add(8, 'hours');
            let to = moment().endOf('day').add(8, 'hours');
            console.log('Topic: ',req.query.topic)
            console.log('FROM: ', from.toISOString(), from.valueOf())
            console.log('TO: ', to.toISOString(), to.valueOf())
            let reading = await Reading.aggregate ([
                {$match: {
                    "topic":  req.query.topic,
                    $or:[
                        {"first": {$gte: new Date(from.toISOString())}},
                        { "last": {$lte: new Date(to.toISOString())}}
                    ],
                    }
                },
                {$unwind: {path: "$samples"}},
                {
                    $project:
                    {
                        "topic": '$topic',
                        "first": '$first',
                        "last":  '$last',
                        "samples": '$samples',
                        'time': { $arrayElemAt: [ "$samples", 0 ] },
                        'val': { $arrayElemAt: [ "$samples", 1 ] },
                    }
                },
                {$match: {
                        "time": {
                            $gte: from.valueOf(),
                            $lte: to.valueOf()}
                        }
                },
                {$group :{
                    "_id":  '$topic' ,
                    // "first": { '$first': '$first' },
                    // "last": { '$first': '$last' },
                    "avg": {
                        $avg: '$val'
                    },
                    "min": {
                        $min: '$val'
                    },
                    "max": {
                        $max: '$val'
                    },
                }}
            ])
        // let temp = JSON.parse(req.body.topics)
        return res.status(200).send( reading )
    } catch (error) {
        return next(error)
    }  
}