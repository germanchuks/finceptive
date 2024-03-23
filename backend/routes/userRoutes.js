const { getUserBalance, increaseUserBalance, decreaseUserBalance, updateUsername, updatePassword, updateAvatar } = require('../controllers/userController');


const router = require('express').Router()

router.get('/get-balance/:userId', getUserBalance)
router.put('/increase-balance/:userId', increaseUserBalance)
router.put('/decrease-balance/:userId', decreaseUserBalance)
router.put('/update-username/:userId', updateUsername)
router.put('/update-password/:userId', updatePassword)
router.put('/update-avatar/:userId', updateAvatar)

module.exports = router