const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validate = require('mongoose-validator')
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
        required: `First name can't be empty`,
        validate: nameValidator
    },
    last_name: {
        type: String,
        required: `Last name can't be empty`,
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

mongoose.model('Technician', technicianSchema)
