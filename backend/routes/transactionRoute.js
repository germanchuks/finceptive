const { addIncome, getIncomes, deleteIncome } = require('../controllers/incomeController');
const { addExpense, getExpense, deleteExpense } = require('../controllers/expenseController')

const router = require('express').Router();


router.post('/add-income/:userId', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)

router.post('/add-expense/:userId', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)

module.exports = router