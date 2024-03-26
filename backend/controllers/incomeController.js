const IncomeSchema = require("../models/incomeModel.js")
const UserSchema = require("../models/userModel.js")


exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body
    const { userId } = req.params

    try {
        //Validations
        const income = IncomeSchema({
            title,
            amount,
            category,
            description,
            date,
            userId,
        })

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

        // Update balance
        const user = await UserSchema.findOne({ _id: userId })
        user.availableBalance = parseFloat(user.availableBalance) + parseFloat(amount)
        await UserSchema.findByIdAndUpdate(userId, user)

        await income.save()

        res.json({
            message: 'Income Added Successfully'
        })
    } catch (error) {
        console.log(error)
        res.json({
            error: 'Server Error'
        })
    }
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
        // Get income to be deleted
        const item = await IncomeSchema.findById(id)

        // Update balance
        const user = await UserSchema.findOne({ _id: item.userId })
        user.availableBalance = parseFloat(user.availableBalance) - parseFloat(item.amount)
        await UserSchema.findByIdAndUpdate(user._id, user)

        // Delete income
        await IncomeSchema.findByIdAndDelete(id)

        res.json({
            amount: item.amount
        })
    } catch (error) {
        res.json({
            error: 'Server Error'
        })
    }
}