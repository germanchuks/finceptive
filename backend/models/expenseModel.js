const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
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
        ref: 'User'
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        maxLength: 50
    },
    type: {
        type: String,
        default: "expense"
    },
    date: {
        type: Date,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Expense', ExpenseSchema)