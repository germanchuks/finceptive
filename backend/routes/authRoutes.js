const router = require('express').Router();
const cors = require('cors');
const { registerUser, loginUser, logoutUser, getUser } = require('../controllers/authController');

// Middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)

router.post('/auth/register', registerUser)
router.post('/auth/login', loginUser)
router.post('/auth/logout', logoutUser)

router.get('/user', getUser)

module.exports = router