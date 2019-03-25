const mongoose = require('mongoose');
const validate = require('mongoose-validator')
const Schema = mongoose.Schema;

const deviceTechnicianSchema = new mongoose.Schema({
    devId: { type: Schema.Types.ObjectId, ref: 'Device', required: true },
    techId: { type: Schema.Types.ObjectId, ref: 'Technician', required: true }
})


mongoose.model('DeviceTechnician', deviceTechnicianSchema)
