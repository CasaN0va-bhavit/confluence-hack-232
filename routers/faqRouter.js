const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('faqs')
})

module.exports = router