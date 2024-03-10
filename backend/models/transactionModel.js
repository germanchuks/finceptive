const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
        maxLength: 20
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    type: {
        type: String,
        default: "income"
    },
    date: {
        type: Date,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Transaction', transactionSchema)