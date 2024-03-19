const { getUserBalance, increaseUserBalance, decreaseUserBalance } = require('../controllers/userController');

const router = require('express').Router()

router.get('/get-balance/:userId', getUserBalance)
router.put('/increase-balance/:userId', increaseUserBalance)
router.put('/decrease-balance/:userId', decreaseUserBalance)

module.exports = router