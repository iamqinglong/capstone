const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validate = require('mongoose-validator')
var Schema = mongoose.Schema;


const readingSchema = new mongoose.Schema({
    day: {
        type: Date,
    },
    // device_id: {
    //     type: String,
    // },
    topic: {
        type: String
    },
    first: {
        type: Date
    },
    last: {
        type: Date
    },
    nsamples: {
        type: Number
    },
    samples:[]
})


mongoose.model('Reading', readingSchema)
