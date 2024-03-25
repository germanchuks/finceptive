const { getWithdrawals } = require('../controllers/withdrawalController');

const router = require('express').Router()

router.get('/get-withdrawals', getWithdrawals)

module.exports = router