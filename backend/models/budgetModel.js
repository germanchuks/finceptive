const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    currentAmount: {
        type: Number,
        default: 0,
    },
    maxAmount: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true })

module.exports = mongoose.model('Budget', budgetSchema)