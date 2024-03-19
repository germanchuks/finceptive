const { addGoal, getGoals, updateGoal, deleteGoal } = require('../controllers/goalController');

const router = require('express').Router()

router.post('/add-goal', addGoal)
    .get('/get-goals', getGoals)
    .put('/update-goal/:id', updateGoal)
    .delete('/delete-goal/:id', deleteGoal)

module.exports = router