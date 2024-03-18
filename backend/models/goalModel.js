const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 20
    },
    targetAmount: {
        type: Number,
        default: 0,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    currentAmount: {
        type: Number,
        default: 0,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    targetDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        trim: true,
        maxLength: 100
    }
}, { timestamps: true })

module.exports = mongoose.model('Goal', goalSchema)