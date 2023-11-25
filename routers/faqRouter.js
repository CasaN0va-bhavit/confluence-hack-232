const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('faqs', {user: req.user})
})

module.exports = router