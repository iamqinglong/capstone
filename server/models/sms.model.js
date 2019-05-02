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

const smsSchema = new mongoose.Schema({
    number: {
        type: Number,
    },
    
})



// deviceSchema.plugin(uniqueValidator, { message: 'Error, {VALUE} is already acquired' });
mongoose.model('Sms', smsSchema)
