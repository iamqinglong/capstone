const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validate = require('mongoose-validator')
var Schema = mongoose.Schema;


const eventSchema = new mongoose.Schema({
    condition: {
        type: String,
        required: `Condition can't be empty`,
    },
    statement: {
        type: String,
        required: `Statement can't be empty`,
    },
    value: {
        type: Number,
        required: `Value can't be empty`,
    },
    action: {
        type: String,
        required: `Action can't be empty`,
    },
})


eventSchema.virtual('devices', {
    ref: 'DeviceEvent',
    localField: '_id',
    foreignField: 'evId',
    justOne: false // set true for one-to-one relationship
})

mongoose.model('Event', eventSchema)
