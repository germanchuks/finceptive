const BudgetSchema = require('../models/budgetModel')

// Create budget
exports.createBudget = async (req, res) => {
    const { userId } = req.params
    const { categoryCreate, maxAmount } = req.body

    try {

        // Check if budget exists already
        const budgetExists = await BudgetSchema.findOne({ userId: userId, category: categoryCreate })
        if (budgetExists) {
            return res.json({
                error: 'Budget already exists. Remove the former before creating a new one.'
            })
        }

        const budget = BudgetSchema({
            category: categoryCreate,
            maxAmount,
            userId
        })

        await budget.save()

        return res.json({
            message: 'Budget created'
        })
    } catch {
        return res.json({
            error: 'Server Error'
        })
    }
}

// Get budgets
exports.getBudgets = async (req, res) => {
    const { userId } = req.query
    try {
        const budgets = await BudgetSchema.find({ userId: userId }).sort({ createdAt: -1 })
        return res.json(budgets)
    } catch (error) {
        return res.json({
            error: 'Server error'
        })
    }
}


// Delete budget
exports.deleteBudget = async (req, res) => {
    const { userId, category } = req.params

    try {
        // Check if budget exists already
        const budget = await BudgetSchema.findOne({ userId: userId, category: category })
        if (!budget) {
            return res.json({
                error: 'No budget set for the selected category.'
            })
        }

        await BudgetSchema.findByIdAndDelete(budget._id)

        return res.json({
            message: 'Budget deleted'
        })
    } catch {
        return res.json({
            error: 'Server Error'
        })
    }
}