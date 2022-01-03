const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
    nameClient: {
        type: String,
        required: true
    },
    nameOrder: {
        type: String,
        required: true
    },
    priceOrder: {
        type: String,
        required: true
    },
    imageOrder: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        required: true,
        default: Date.now
    }

})

module.exports = mongoose.model('order', ordersSchema)