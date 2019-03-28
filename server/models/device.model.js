const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validate = require('mongoose-validator')
const uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

let nameValidator = [
    validate({
      validator: 'matches',
      arguments: /^[A-Za-z0-9- ]+$/,
      passIfEmpty: true,
      message: 'Name should be an alphanumeric or with space',
    }),
  ]

const deviceSchema = new mongoose.Schema({
    device_name: {
        type: String,
        unique: true,
        required: `Device name can't be empty`,
        validate: nameValidator
    },
    data_source: {
        type: String,
        unique: true,
        required: `Data source can't be empty`,
    },
    location: {
        type: String,
        // unique: true,
        required: `Location can't be empty`,
        validate: nameValidator
    },
})


deviceSchema.virtual('technicians', {
    ref: 'DeviceTechnician',
    localField: '_id',
    foreignField: 'devId',
    justOne: false // set true for one-to-one relationship
})

deviceSchema.virtual('events', {
    ref: 'DeviceEvent',
    localField: '_id',
    foreignField: 'devId',
    justOne: false // set true for one-to-one relationship
})

deviceSchema.plugin(uniqueValidator, { message: 'Error, {VALUE} is already acquired' });
mongoose.model('Device', deviceSchema)
