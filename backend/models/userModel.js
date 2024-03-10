const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    password: {
        type: String,
        required: true,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    avatarImage: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)