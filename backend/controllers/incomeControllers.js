const IncomeSchema = require("../models/incomeModel.js")
const UserSchema = require("../models/userModel.js")


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
            return res.json({
                error: 'All fields required'
            })
        }
        if (amount <= 0 || isNaN(amount)) {
            return res.json({
                error: "Amount must be a positive number"
            })
        }
        await income.save()

        res.json({
            message: 'Income Added Successfully'
        })
    } catch (error) {
        res.json({
            error: 'Server Error'
        })
    }
    console.log(income)
}

exports.getIncomes = async (req, res) => {

    // Get current user id
    const { userId } = req.query;
    try {
        const incomes = await IncomeSchema.find({ userId }).sort({ createdAt: -1 })
        res.json(incomes)
    } catch (error) {
        res.json({
            error: 'Server error'
        })
    }
}

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await IncomeSchema.findByIdAndDelete(id)
        res.json({
            amount: item.amount
        })
    } catch (error) {
        res.json({
            error: 'Server Error'
        })
    }
}