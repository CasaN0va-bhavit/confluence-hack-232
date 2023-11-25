const router = require('express').Router()
const passport = require('passport')

router.get('/', (req, res) => {
    console.log(req.user == undefined)
    res.render('login', {user: false})
})

router.post('/', passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
    successRedirect: '/home'
}))

module.exports = router