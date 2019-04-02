const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userNotifcationSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, },
    notifId: { type: Schema.Types.ObjectId, ref: 'Notification', required: true , },
    status: { type: Boolean , required: true , }
})

mongoose.model('UserNotification', userNotifcationSchema)
