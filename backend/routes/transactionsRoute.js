const { addIncome, getIncomes, deleteIncome } = require('../controllers/incomeControllers');
const { addExpense, getExpense, deleteExpense } = require('../controllers/expenseControllers');

const router = require('express').Router();


router.post('/users/transactions/add-income', addIncome)
    .get('/users/transactions/get-incomes', getIncomes)
    .delete('/users/transactions/delete-income/:id', deleteIncome)
    .post('/users/transactions/add-expense', addExpense)
    .get('/users/transactions/get-expenses', getExpense)
    .delete('/users/transactions/delete-expense/:id', deleteExpense)

module.exports = router