const IncomeSchema = require("../models/incomeModel.js")

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date, userId } = req.body

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date,
        userId,
    })

    try {
        //Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields required' })
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: "Amount must be a positive number" })
        }
        await income.save()
        res.status(200).json({ message: 'Income Added' })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
    console.log(income)
}

exports.getIncomes = async (req, res) => {

    // Get current user id
    const { userId } = req.query;
    try {
        const incomes = await IncomeSchema.find({ userId }).sort({ createdAt: -1 })
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({ message: 'Income Deleted' })
        })
        .catch((err) => {
            res.status(500).json({ message: 'Server Error' })
        })
}