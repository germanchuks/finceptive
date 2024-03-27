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


// async (req, res, next) => {
//     const headers = req.headers
//     const { authorization } = headers
//     let token
//     if (authorization) {
//         token = authorization.split(" ")[1]
//     }
//     console.log({ headers, authorization, token })
//     if (!token) {
//         return
//     }
//     const userKey = process.env.ACCESS_TOKEN_SECRET
//     const payload = await decode(token, userKey)
//     req.user_id = payload.id
//     console.log({ payload })
//     next()

// },

module.exports = router