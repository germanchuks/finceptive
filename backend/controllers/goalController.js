const GoalSchema = require("../models/goalModel.js")
const WithdrawalSchema = require("../models/withdrawalModel.js")
const UserSchema = require("../models/userModel")

exports.addGoal = async (req, res) => {
    const { title, targetAmount, category, userId, description, targetDate } = req.body;

    const goal = new GoalSchema({
        title,
        targetAmount,
        category,
        userId,
        targetDate,
        description
    })

    try {
        //Validations
        if (!title || !targetAmount || !category || !targetDate) {
            return res.json({
                error: 'All fields required'
            })
        }
        if (targetAmount <= 0 || isNaN(targetAmount)) {
            return res.json({
                error: "Amount must be a positive number"
            })
        }
        await goal.save()

        res.json({
            message: 'Goal Created Successfully'
        })
    } catch (error) {
        res.json({
            error: 'Server Error'
        })
    }
}

exports.getGoals = async (req, res) => {

    // Get current user id
    const { userId } = req.query;
    try {
        const goals = await GoalSchema.find({ userId }).sort({ createdAt: -1 })
        res.json(goals)
    } catch (error) {
        res.json({
            error: 'Server error'
        })
    }
}

exports.deleteGoal = async (req, res) => {
    const { completed } = req.query;
    const { id } = req.params;
    try {
        // Find goal to be deleted
        const goal = await GoalSchema.findById(id)

        // Get current amount and related userId
        const { currentAmount, title, userId } = goal

        // Add to withdrawals
        if (currentAmount != 0) {
            const withdrawal = new WithdrawalSchema({
                amount: currentAmount,
                goalId: id,
                userId,
                title,
                completed
            })
            await withdrawal.save()
        }

        // Add saved amount to available balance if target was not met
        if (completed === 'false') {
            // Update balance
            const user = await UserSchema.findOne({ _id: userId })
            user.availableBalance = parseFloat(user.availableBalance) + parseFloat(currentAmount)
            await UserSchema.findByIdAndUpdate(user._id, user)

        }

        // Delete goal
        const item = await GoalSchema.findByIdAndDelete(id)

        res.json({
            amount: item.currentAmount
        })
    } catch (error) {
        res.json({
            error: error
        })
    }
}