const { createBudget, getBudgets, deleteBudget } = require('../controllers/budgetController');

const router = require('express').Router();

router.post('/create-budget/:userId', createBudget)
router.get('/get-budgets', getBudgets)
router.delete('/delete-budget/:userId/:category', deleteBudget)

module.exports = router;