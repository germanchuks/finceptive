const { addGoal, getGoals, deleteGoal } = require('../controllers/goalController');

const router = require('express').Router()

router.post('/add-goal', addGoal)
    .get('/get-goals', getGoals)
    .delete('/delete-goal/:id', deleteGoal)

module.exports = router