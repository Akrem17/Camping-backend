const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema(
    {
        tour: {
            type: mongoose.Schema.ObjectId,
            ref: 'Tour',
            required: true,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            unique:true,
        },
        price: {
            type: Number,
            required: true         
        },
        bookingDate: {
            type: Date,
            default:Date.now(),

        },
        paid: {
            type: Boolean,
            default: false,
          },
        nbrPlace: {
            type: Number,
            default: 1,
          },
    }
)








module.exports = mongoose.model('booking', bookingSchema);