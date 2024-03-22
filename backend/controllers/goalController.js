const GoalSchema = require("../models/goalModel.js")

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
        console.log('validation')
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
    console.log(goal)
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
    const { id } = req.params;
    try {
        const item = await GoalSchema.findByIdAndDelete(id)
        res.json({
            amount: item.currentAmount
        })
    } catch (error) {
        res.json({
            error: 'Server Error'
        })
    }
}