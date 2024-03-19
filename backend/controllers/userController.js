const UserSchema = require("../models/userModel");

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
            error: "Server Error"
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
            error: "Server Error"
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
            error: "Server Error"
        })
    }
};