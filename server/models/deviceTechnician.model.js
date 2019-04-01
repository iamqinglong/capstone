const mongoose = require('mongoose');
const validate = require('mongoose-validator')
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const deviceTechnicianSchema = new mongoose.Schema({
    devId: { type: Schema.Types.ObjectId, ref: 'Device', required: true, unique: true },
    techId: { type: Schema.Types.ObjectId, ref: 'Technician', required: true , unique: true}
})

deviceTechnicianSchema.plugin(uniqueValidator, { message: 'Error, {VALUE} is already acquired' });
mongoose.model('DeviceTechnician', deviceTechnicianSchema)
