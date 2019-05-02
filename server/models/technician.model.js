const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validate = require('mongoose-validator')
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken')
var Schema = mongoose.Schema;

let nameValidator = [
    validate({
      validator: 'matches',
      arguments: /^[A-Za-z ]+$/,
      passIfEmpty: true,
      message: 'Name should be an alphabetic or with space',
    }),
  ]

const technicianSchema = new mongoose.Schema({
    first_name :{
        type: String,
        unique: true,
        // lowercase: true,
        required: `First name can't be empty`,
        validate: nameValidator
    },
    last_name: {
        type: String,
        required: `Last name can't be empty`,
        // lowercase: true,
        unique: true,
        validate: nameValidator
    },
    phone_number: {
        type: String,
        require: `Phone number can't be empty`,
    }
})

technicianSchema.virtual('devices', {
    ref: 'DeviceTechnician',
    localField: '_id',
    foreignField: 'techId',
    justOne: false // set true for one-to-one relationship
})

technicianSchema.plugin(uniqueValidator, { message: 'Error, {VALUE} is already acquired' });
mongoose.model('Technician', technicianSchema)
