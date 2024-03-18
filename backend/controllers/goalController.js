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

exports.updateGoal = async (req, res) => {
    const { id } = req.params;
    const update = { ...req.body }
    try {
        const updatedGoal = await GoalSchema.findByIdAndUpdate(id, update, { new: true })
        res.json({
            message: 'Goal Updated Successfully'
        })
    } catch (error) {
        res.json({
            error: 'Server error'
        })
    }
    console.log(updatedGoal)
}

exports.deleteGoal = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    GoalSchema.findByIdAndDelete(id)
        .then((goal) => {
            res.json({
                message: 'Goal Deleted Successfully'
            })
        })
        .catch((err) => {
            res.json({
                error: 'Server Error'
            })
        })
}