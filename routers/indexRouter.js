const router = require('express').Router()

router.get('/', async (req, res) => {
    res.render('index', {user: req.user, myPath: '/'});
})
router.get('/home', (req, res) => {
    res.render('index', {user: req.user, myPath: '/home'})
})

module.exports = router