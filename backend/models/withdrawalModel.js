const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
    amount: {
        type: Number
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
    completed: {
        type: Boolean
    },
    type: {
        type: String,
        default: "withdrawal"
    },
    date: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true })

module.exports = mongoose.model('Withdrawal', withdrawalSchema)