const { getUserInfo, getUserBalance, increaseUserBalance, decreaseUserBalance, setBudget, updateUsername, updatePassword, updateAvatar, updateCurrency, resetAccount } = require('../controllers/userController');


const router = require('express').Router()

router.get('/get-info/:userId', getUserInfo)
router.get('/get-balance/:userId', getUserBalance)
router.put('/increase-balance/:userId', increaseUserBalance)
router.put('/decrease-balance/:userId', decreaseUserBalance)
router.put('/update-username/:userId', updateUsername)
router.put('/update-password/:userId', updatePassword)
router.put('/update-avatar/:userId', updateAvatar)
router.put('/update-currency/:userId', updateCurrency)
router.delete('/reset-account/:userId', resetAccount)

module.exports = router