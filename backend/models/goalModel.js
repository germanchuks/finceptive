const mongoose = require('mongoose');

const savingGoalSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Goal', savingGoalSchema)