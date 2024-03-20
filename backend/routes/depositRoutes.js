const { addDeposit, getDeposits, deleteDeposit } = require('../controllers/depositController');

const router = require('express').Router()

router.post('/add-deposit', addDeposit)
    .get('/get-deposits', getDeposits)
    .delete('/delete-deposit/:id', deleteDeposit)

module.exports = router