const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    storeId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Item', ItemSchema)