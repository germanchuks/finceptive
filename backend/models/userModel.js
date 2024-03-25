const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    availableBalance: {
        type: Number,
        default: 0
    },
    avatarImage: {
        type: String,
        default: "",
    },
    preferredCurrency: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema)