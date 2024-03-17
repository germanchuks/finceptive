const mongoose = require('mongoose');

const savingGoalSchema = new mongoose.Schema({
    goalTitle: {
        type: String,
        required: true,
        maxLength: 20
    },
    goalAmount: {
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
    goalDueDate: {
        type: Date,
        required: true
    },
    goalDescription: {
        type: String,
        trim: true,
        maxLength: 100
    }
}, { timestamps: true })

module.exports = mongoose.model('Goal', savingGoalSchema)