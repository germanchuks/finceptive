const UserSchema = require("../models/userModel");
const IncomeSchema = require("../models/incomeModel");
const ExpenseSchema = require("../models/expenseModel");
const GoalSchema = require("../models/goalModel");
const DepositSchema = require("../models/depositModel");
const WithdrawalSchema = require("../models/withdrawalModel");
const BudgetSchema = require("../models/budgetModel")

const { currencyConverter } = require("../utils/currencyConverter")

const { comparePassword, hashPassword } = require('../utils/auth')

exports.getUserInfo = async (req, res) => {
    const { userId } = req.params
    try {
        const user = await UserSchema.findById(userId)

        const { availableBalance, avatarImage, preferredCurrency } = user;

        return res.json({
            balance: availableBalance,
            avatar: avatarImage,
            currency: preferredCurrency
        });

    } catch {
        return res.json({
            error: "Error occured"
        })
    }
};

exports.getUserBalance = async (req, res) => {
    const { userId } = req.params
    try {
        const { availableBalance } = await UserSchema.findById(userId)

        return res.json({
            balance: availableBalance
        })
    } catch {
        return res.json({
            error: "Error occured"
        })
    }
}


exports.increaseUserBalance = async (req, res) => {
    const { amount } = req.body
    const { userId } = req.params
    try {
        const user = await UserSchema.findByIdAndUpdate(
            userId,
            { availableBalance: amount },
            { new: true }
        )

        const { availableBalance } = user;

        return res.json({
            balance: availableBalance
        });

    } catch {
        return res.json({
            error: "Error occured"
        })
    }
};

exports.decreaseUserBalance = async (req, res) => {
    const { amount } = req.body
    const { userId } = req.params
    try {
        const user = await UserSchema.findByIdAndUpdate(
            userId,
            { availableBalance: amount },
            { new: true }
        )

        const { availableBalance } = user;

        return res.json({
            balance: availableBalance
        });

    } catch {
        return res.json({
            error: "Error occured"
        })
    }
};


// Update user name
exports.updateUsername = async (req, res) => {
    const { newname } = req.body
    const { userId } = req.params
    try {
        const user = await UserSchema.findByIdAndUpdate(
            userId,
            { username: newname },
            { new: true }

        )

        const { username } = user;
        return res.json({
            username: username
        })
    } catch {
        return res.json({
            error: "Could not update username. Try again later"
        })
    }
};


// Update user password
exports.updatePassword = async (req, res) => {

    try {
        const { password, newpassword, step } = req.body
        const { userId } = req.params

        //Check if user exists
        const user = await UserSchema.findById(userId).select("+password")

        // Check if request password matches stored password
        if (step === 1) {
            // Compare passwords
            const isMatch = await comparePassword(password, user.password)

            if (!isMatch) {
                return res.json({
                    error: 'Incorrect password'
                })
            } else {
                return res.json({
                    step: 2
                })
            }
        }

        // Change user passwords is current password is verified
        if (step === 2) {
            // Check if password exists and has mininum of 6 characters
            if (!newpassword || newpassword.length < 6) {
                return res.json({
                    error: 'Password should be at least 6 characters long'
                })
            }

            //Check if current password and newpassword are the same
            const isMatchNew = await comparePassword(newpassword, user.password)
            if (isMatchNew) {
                return res.json({
                    error: 'Your new password cannot be the same as your current password.'
                })
            }

            // Hash password
            const hashedPassword = await hashPassword(newpassword)

            await UserSchema.findByIdAndUpdate(
                userId,
                { password: hashedPassword },
                { new: true }
            )
            return res.json({
                message: "Password changed successfully!"
            })
        }

    } catch {
        return res.json({
            error: "Error occured while trying to update password. Try again later!"
        })
    }
};


// Update avatar
exports.updateAvatar = async (req, res) => {
    const { image } = req.body
    const { userId } = req.params
    try {
        const user = await UserSchema.findByIdAndUpdate(
            userId,
            { avatarImage: image },
            { new: true }
        )

        const { avatarImage } = user;

        return res.json({
            image: avatarImage
        })
    } catch {
        return res.json({
            error: "Could not update avatar. Try again later"
        })
    }
};


// Get currency exchange rate
exports.updateCurrency = async (req, res) => {
    const { base, symbol } = req.body;
    const { userId } = req.params

    // https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_Ps3sDS6jueMYyIxGuXeNkwZ5EwJ9FPoVRQDIcJVQ

    // const apiKey = 'fca_live_Ps3sDS6jueMYyIxGuXeNkwZ5EwJ9FPoVRQDIcJVQ';
    // const baseUrl = 'https://api.freecurrencyapi.com/v1/latest';

    // const url = new URL(baseUrl);
    // url.searchParams.set('apikey', apiKey);
    // url.searchParams.set('base_currency', base);
    // url.searchParams.set('currencies', symbol);

    // Dummy USD/NGN Rate (23rd March 2024) - To be updated dynamically using third party API
    const rate = 1450

    try {
        // Update available balance and preferred currency
        const user = await UserSchema.findById(userId)
        await UserSchema.findByIdAndUpdate(
            user._id,
            {
                availableBalance: currencyConverter(base, user.availableBalance, rate),
                preferredCurrency: symbol
            },
        )


        // Update goals
        const goals = await GoalSchema.find({ userId: userId })
        for (const goal of goals) {
            goal.targetAmount = currencyConverter(base, goal.targetAmount, rate);
            goal.currentAmount = currencyConverter(base, goal.currentAmount, rate);
            await GoalSchema.findByIdAndUpdate(goal._id, goal)
        }


        // Update incomes
        const incomes = await IncomeSchema.find({ userId: userId })

        for (const income of incomes) {
            income.amount = currencyConverter(base, income.amount, rate);
            await IncomeSchema.findByIdAndUpdate(income._id, income)
        }


        // Update expenses
        const expenses = await ExpenseSchema.find({ userId: userId })

        for (const expense of expenses) {
            expense.amount = currencyConverter(base, expense.amount, rate);
            await ExpenseSchema.findByIdAndUpdate(expense._id, expense)
        }


        // Update deposits
        const deposits = await DepositSchema.find({ userId: userId })

        for (const deposit of deposits) {
            deposit.amount = currencyConverter(base, deposit.amount, rate);
            await DepositSchema.findByIdAndUpdate(deposit._id, deposit)
        }


        // Update withdrawals
        const withdrawals = await WithdrawalSchema.find({ userId: userId })

        for (const withdrawal of withdrawals) {
            withdrawal.amount = currencyConverter(base, withdrawal.amount, rate);
            await WithdrawalSchema.findByIdAndUpdate(withdrawal._id, withdrawal)
        }

        // Update budget
        const budgets = await BudgetSchema.find({ userId: userId })

        for (const budget of budgets) {
            budget.maxAmount = currencyConverter(base, budget.maxAmount, rate);
            budget.currentAmount = currencyConverter(base, budget.currentAmount, rate);
            await BudgetSchema.findByIdAndUpdate(budget._id, budget)
        }

        return res.json({
            message: "Currency updated successfully"
        })


    } catch (error) {
        res.json({
            error: "Could not update currency. Try again later!"
        })
    }

}


// Reset Account
exports.resetAccount = async (req, res) => {
    const { userId } = req.params;
    try {
        // Remove available balance 
        const user = await UserSchema.findById(userId)

        if (user.availableBalance === 0) {
            return res.json({
                zeroBalance: 'Account has no transaction.'
            })
        }

        await UserSchema.findByIdAndUpdate(
            user._id,
            {
                availableBalance: 0
            }
        )


        // Update goals
        const goals = await GoalSchema.find({ userId: userId })
        for (const goal of goals) {
            await GoalSchema.findByIdAndDelete(goal._id)
        }


        // Update incomes
        const incomes = await IncomeSchema.find({ userId: userId })

        for (const income of incomes) {
            await IncomeSchema.findByIdAndDelete(income._id)
        }


        // Update expenses
        const expenses = await ExpenseSchema.find({ userId: userId })

        for (const expense of expenses) {
            await ExpenseSchema.findByIdAndDelete(expense._id)
        }


        // Update deposits
        const deposits = await DepositSchema.find({ userId: userId })

        for (const deposit of deposits) {
            await DepositSchema.findByIdAndDelete(deposit._id)
        }

        // Update withdrawal
        const withdrawals = await WithdrawalSchema.find({ userId: userId })

        for (const withdrawal of withdrawals) {
            await WithdrawalSchema.findByIdAndDelete(withdrawal._id)
        }

        // Update budgets
        const budgets = await BudgetSchema.find({ userId: userId })

        for (const budget of budgets) {
            await BudgetSchema.findByIdAndDelete(budget._id)
        }

        return res.json({
            message: "Account reset complete."
        })


    } catch (error) {
        res.json({
            error: "Reset unsuccessful. Try again later!"
        })
    }
}
