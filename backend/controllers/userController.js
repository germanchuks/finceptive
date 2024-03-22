const UserSchema = require("../models/userModel");
const { comparePassword, hashPassword } = require('../utils/auth')

exports.getUserBalance = async (req, res) => {
    const { userId } = req.params
    try {
        const user = await UserSchema.findById(userId)

        const { availableBalance } = user;

        return res.json({
            balance: availableBalance
        });

    } catch {
        return res.json({
            error: "Error occured"
        })
    }
};

exports.increaseUserBalance = async (req, res) => {
    const { amount } = req.body
    const { userId } = req.params
    try {
        const user = await UserSchema.findByIdAndUpdate(
            userId,
            { availableBalance: amount },
            { new: true }
        )

        const { availableBalance } = user;

        return res.json({
            balance: availableBalance
        });

    } catch {
        return res.json({
            error: "Error occured"
        })
    }
};

exports.decreaseUserBalance = async (req, res) => {
    const { amount } = req.body
    const { userId } = req.params
    try {
        const user = await UserSchema.findByIdAndUpdate(
            userId,
            { availableBalance: amount },
            { new: true }
        )

        const { availableBalance } = user;

        return res.json({
            balance: availableBalance
        });

    } catch {
        return res.json({
            error: "Error occured"
        })
    }
};


// Update user name
exports.updateUsername = async (req, res) => {
    const { newname } = req.body
    const { userId } = req.params
    try {
        const user = await UserSchema.findByIdAndUpdate(
            userId,
            { username: newname },
            { new: true }

        )

        const { username } = user;
        return res.json({
            username: username
        })
    } catch {
        return res.json({
            error: "Could not update username. Try again later"
        })
    }
};


// Update user password
exports.updatePassword = async (req, res) => {

    try {
        const { password, newpassword, step } = req.body
        const { userId } = req.params

        //Check if user exists
        const user = await UserSchema.findById(userId).select("+password")

        // Check if request password matches stored password
        if (step === 1) {
            // Compare passwords
            const isMatch = await comparePassword(password, user.password)

            if (!isMatch) {
                return res.json({
                    error: 'Incorrect password'
                })
            } else {
                return res.json({
                    step: 2
                })
            }
        }

        // Change user passwords is current password is verified
        if (step === 2) {
            // Check if password exists and has mininum of 6 characters
            if (!newpassword || newpassword.length < 6) {
                return res.json({
                    error: 'Password should be at least 6 characters long'
                })
            }

            //Check if current password and newpassword are the same
            const isMatchNew = await comparePassword(newpassword, user.password)
            if (isMatchNew) {
                return res.json({
                    error: 'Your new password cannot be the same as your current password.'
                })
            }

            // Hash password
            const hashedPassword = await hashPassword(newpassword)

            await UserSchema.findByIdAndUpdate(
                userId,
                { password: hashedPassword },
                { new: true }
            )
            return res.json({
                message: "Password changed successfully!"
            })
        }

    } catch {
        return res.json({
            error: "Error occured while trying to update password. Try again later!"
        })
    }
};


// Update avatar
exports.updateAvatar = async (req, res) => {

}