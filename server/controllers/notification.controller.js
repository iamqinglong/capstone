const mongoose = require('mongoose')
const Notification = mongoose.model('Notification')
const UserNotification = mongoose.model('UserNotification')

module.exports.create = async (req,res,next) => {

    try{
             let notif = new Notification(
                {
                    subject: req.body.subject,
                    message : req.body.message
                }
            );

        let temp = await notif.save()
        let result = await Notification.aggregate([
            {'$match' : {'_id' : temp._id}},
            {
              "$addFields": 
                {
                    'users': [],
                },
            },
            // { '$group': {
            //   '_id': '$_id',
            //   'subject': '$subject',
            //   'message': '$message',
            //   'created_at': '$created_at',
            //   'users' : '$users'
            // }}
        ])
        return res.status(200).send({status: true , 'message':`Notification created successfully`, result})

    }catch(error){
        return next(error)
    }
   
    
}

module.exports.get = async (req,res,next) => {

    try{
        
        let notification = await Notification.aggregate([
              { '$lookup': { 'from': UserNotification.collection.name,
                 // Escape 'let' because its a reserved word in JS
                  // `let` is where you pull in variables from the 'Notification' table
                  // to use in your `$expr
                let: {'id': '$_id',},
                        pipeline: [
                      {
                        $match: {
                          $expr: {
                            // Weird but `$expr` must have exactly one key, so you need to
                            // use `$and`, otherwise you get an error 'MongoError: An
                            // object representing an expression must have exactly one field'
                            $and: [
                              // Fields prefixed with one '$' are in the 'UserNotification' collection,
                              // that is, the `from` collection. Fields prefixed with '$$'
                              // are from the `let` above
                              { $eq: ['$notifId', '$$id'] },
                              { $eq: ['$userId', mongoose.Types.ObjectId(req.params.id)] }
                            ]
                          }
                        }
                      }
                    ],
                'as': 'users'
              }},
              {
                $unwind: {
                    path: "$users.users",
                    preserveNullAndEmptyArrays: true
                }
              },
              // {
              //   $match: { "users": { $eq: [] } }
              // },
          
            
              { '$group': {
                '_id': '$_id',
                'subject': { '$first': '$subject' },
                'message': { '$first': '$message' },
                'created_at': { '$first': '$created_at' },
                'users': { '$first': '$users' }
              }}
            ]);

            let notif = await Notification.aggregate([
              { '$lookup': { 'from': UserNotification.collection.name,
                 // Escape 'let' because its a reserved word in JS
                  // `let` is where you pull in variables from the 'Notification' table
                  // to use in your `$expr
                let: {'id': '$_id',},
                        pipeline: [
                      {
                        $match: {
                          $expr: {
                            // Weird but `$expr` must have exactly one key, so you need to
                            // use `$and`, otherwise you get an error 'MongoError: An
                            // object representing an expression must have exactly one field'
                            $and: [
                              // Fields prefixed with one '$' are in the 'UserNotification' collection,
                              // that is, the `from` collection. Fields prefixed with '$$'
                              // are from the `let` above
                              { $eq: ['$notifId', '$$id'] },
                              { $eq: ['$userId', mongoose.Types.ObjectId(req.params.id)] }
                            ]
                          }
                        }
                      }
                    ],
                'as': 'users'
              }},
              {
                $unwind: {
                    path: "$users.users",
                    preserveNullAndEmptyArrays: true
                }
              },
              {
                $match: { "users": { $eq: [] } }
              },
              { '$group': {
                '_id': '$_id',
                'subject': { '$first': '$subject' },
                'message': { '$first': '$message' },
                'created_at': { '$first': '$created_at' },
                'users': { '$first': '$users' }
              }}
            ]);

        return res.status(200).send({ status: true , unread : notif.length, notification})

    }catch(error){
        return next(error)
    }
   
    
}

module.exports.getNotif = async (req,res,next) => {

  try{

     let notification = await Notification.findById(req.params.id)

      return res.status(200).send({ status: true , notification })

  }catch(error){
      return next(error)
  }
 
  
}

