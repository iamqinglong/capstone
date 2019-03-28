const mongoose = require('mongoose');
const validate = require('mongoose-validator')
const Schema = mongoose.Schema;

const deviceEventSchema = new mongoose.Schema({
    devId: { type: Schema.Types.ObjectId, ref: 'Device', required: true },
    evId: { type: Schema.Types.ObjectId, ref: 'Event', required: true }
})


mongoose.model('DeviceEvent', deviceEventSchema)
