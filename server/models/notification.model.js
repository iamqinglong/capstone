const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    subject: {
        type: String,
    },
    message: {
        type: String,
    },
},  {timestamps: { createdAt: 'created_at' } })

NotificationSchema.virtual('users', {
    ref: 'UserNotification',
    localField: '_id',
    foreignField: 'notifId',
    justOne: false // set true for one-to-one relationship
})

module.exports = mongoose.model('Notification', NotificationSchema)