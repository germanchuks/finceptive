const router = require('express').Router()



router.get('/goals', (req, res) => {
    res.send('User Saving Goals')
})

module.exports = router