const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
    amount: {
        type: Number,
        default: 0,
    },
    goalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goal'

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true })

module.exports = mongoose.model('Deposit', depositSchema)