const DepositSchema = require("../models/depositModel.js")
const GoalSchema = require("../models/goalModel.js")
const UserSchema = require("../models/userModel")

exports.addDeposit = async (req, res) => {
    const { amount, goalId, userId } = req.body;

    try {
        // Get Goal
        const goal = await GoalSchema.findById(goalId)

        // Get current amount
        const { currentAmount, title } = goal

        const deposit = new DepositSchema({
            amount,
            userId,
            goalId,
            title
        })

        // Calculate new amount
        const newBalance = parseFloat(currentAmount) + parseFloat(amount)

        // Update Goal
        const updatedGoal = await GoalSchema.findByIdAndUpdate(goalId, { currentAmount: newBalance }, { new: true })

        await deposit.save()
        res.json(deposit)
        console.log(deposit)
    } catch (error) {
        res.json({
            error: 'Server Error'
        })
    }
}

exports.getDeposits = async (req, res) => {

    try {
        // Check if goalId is present in the request body
        if (req.query.goalId) {
            const deposits = await DepositSchema.find({ goalId: req.query.goalId }).sort({ createdAt: -1 });
            return res.json({
                deposits: deposits
            });
        }
        // Check for userId
        if (req.query.userId) {
            const deposits = await DepositSchema.find({ userId: req.query.userId }).sort({ createdAt: -1 });
            return res.json({
                deposits: deposits
            });
        }
    } catch (error) {
        res.json({
            error: 'Server error'
        })
    }
}


exports.deleteDeposit = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await DepositSchema.findByIdAndDelete(id)
        // Update Goal
        const { goalId } = item
        const goal = await GoalSchema.findById(goalId)
        // Get current amount
        const { currentAmount } = goal
        const newBalance = parseFloat(currentAmount) - parseFloat(item.amount)
        const updatedGoal = await GoalSchema.findByIdAndUpdate(goalId, { currentAmount: newBalance }, { new: true })

        res.json({
            amount: item.amount
        })
    } catch (error) {
        res.json({
            error: 'Server Error'
        })
    }
}