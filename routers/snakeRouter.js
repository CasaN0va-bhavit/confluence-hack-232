const router = require('express').Router()
const User = require('../schemas/userSchema')

router.get('/', async (req, res) => {
    res.render('snake')
})

router.post('/', async (req, res) => {
    const {score} = req.body
    const foundUser = await User.findOne({username: req.user.username})
    await User.updateOne({username: req.user.username}, {
        $set: {
            coins: (Number(score) * 10) + foundUser.coins
        }
    })
    console.log(await User.findOne({username: req.user.username}))
})

module.exports = router