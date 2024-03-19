const ExpenseSchema = require("../models/expenseModel.js")

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date, userId } = req.body

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
        if (!title || !category || !description || !date) {
            return res.json({
                error: 'All fields required'
            })
        }
        if (amount <= 0 || isNaN(amount)) {
            return res.json({
                error: "Amount must be a positive number"
            })
        }
        await expense.save()
        res.json({
            message: 'Expense Added Succesfully'
        })
    } catch (error) {
        res.json({
            error: 'Server Error'
        })
    }
    console.log(expense)
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
    console.log(req.params);
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.json({
                message: 'Expense Deleted Successfully'
            })
        })
        .catch((err) => {
            res.json({
                error: 'Server Error'
            })
        })
}