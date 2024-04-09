const ExpenseSchema = require("../models/expenseModel.js")
const BudgetSchema = require("../models/budgetModel.js");
const UserSchema = require("../models/userModel.js")

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body
    const { userId } = req.params

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
        userId
    })

    try {
        //Validations
        if (!title || !category || !date) {
            return res.json({
                error: 'Please provide all required fields'
            })
        }
        if (amount <= 0 || isNaN(amount)) {
            return res.json({
                error: "Amount must be a positive number"
            })
        }

        // Check if budget with category exists
        const budget = await BudgetSchema.findOne({ category: category, userId: userId })

        // Update budget if categories matches and budget exists
        if (budget) {
            budget.currentAmount = parseFloat(budget.currentAmount) + parseFloat(amount);
            await BudgetSchema.findByIdAndUpdate(budget._id, budget)
        }

        // Update balance
        const user = await UserSchema.findOne({ _id: userId })
        user.availableBalance = parseFloat(user.availableBalance) - parseFloat(amount)
        await UserSchema.findByIdAndUpdate(userId, user)

        await expense.save()

        res.json({
            message: 'Expense Added Succesfully'
        })
    } catch (error) {
        res.json({
            error: 'Server Error'
        })
    }
}

exports.getExpense = async (req, res) => {
    // Check current user id
    const { userId } = req.query;

    try {
        const expenses = await ExpenseSchema.find({ userId }).sort({ createdAt: -1 })
        return res.json(expenses)
    } catch (error) {
        return res.json({
            error: 'Server error'
        })
    }
}

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        // Get expense item to be deleted
        const item = await ExpenseSchema.findById(id)

        // Check if budget with category exists
        // const budget = await BudgetSchema.findOne({ category: item.category })

        // Update budget if categories matches and budget exists
        // if (budget.length) {
        //     budget.currentAmount = budget.currentAmount - item.amount;
        //     await BudgetSchema.findByIdAndUpdate(budget._id, budget)
        // }

        // Update balance
        const user = await UserSchema.findOne({ _id: item.userId })
        user.availableBalance = parseFloat(user.availableBalance) + parseFloat(item.amount)
        await UserSchema.findByIdAndUpdate(user._id, user)

        // Delete expense
        await ExpenseSchema.findByIdAndDelete(id)

        res.json({
            message: 'Expense deleted'
        })
    } catch (error) {
        res.json({
            error: 'Server Error'
        })
    }
}