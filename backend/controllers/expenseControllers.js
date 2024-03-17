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
            return res.status(400).json({ message: 'All fields required' })
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: "Amount must be a positive number" })
        }
        await expense.save()
        res.status(200).json({ message: 'Expense Added' })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
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
        return res.json({ message: 'Server error' })
    }
}

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({ message: 'Expense Deleted' })
        })
        .catch((err) => {
            res.status(500).json({ message: 'Server Error' })
        })
}