const WithdrawalSchema = require("../models/withdrawalModel.js")

exports.getWithdrawals = async (req, res) => {

    try {
        // Check if goalId is present in the request body
        if (req.query.goalId) {
            const withdrawals = await WithdrawalSchema.find({ goalId: req.query.goalId }).sort({ createdAt: -1 });
            return res.json(withdrawals);
        }
        // Check for userId
        if (req.query.userId) {
            const withdrawals = await WithdrawalSchema.find({ userId: req.query.userId }).sort({ createdAt: -1 });
            return res.json(withdrawals);
        }
    } catch (error) {
        res.json({
            error: 'Server error'
        })
    }
}