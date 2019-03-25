const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StoreSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

StoreSchema.virtual('items', {
    ref: 'Item',
    localField: '_id',
    foreignField: 'storeId',
    justOne: false // set true for one-to-one relationship
})

module.exports = mongoose.model('Store', StoreSchema)