const router = require('express').Router()
const User = require('../schemas/userSchema')

router.get('/', async (req, res) => {
    res.render('items', {user: req.user})
})

router.post('/:id', async (req, res) => {
    const {id} = req.params
    const currentItems = req.user.items,
    currentCoins = req.user.coins
    switch (id) {
        case '1':
            console.log('Initializing Buy Power Up 1')
            currentItems.push('powerup1')
            if (currentCoins < 50) {
                return res.redirect('/items')
            }
            await User.findOneAndUpdate({username: req.user.username}, {
                $set: {
                    items: currentItems,
                    coins: currentCoins - 50
                }
            })
            console.log(await User.findOne({username: req.user.username}))
            console.log("BOUGHT POWER UP 1")
            res.redirect('/items')
            break;
        case '2':
            console.log('Initializing Buy Power Up 2')
            currentItems.push('powerup2')
            if (currentCoins < 50) {
                return res.redirect('/items')
            }
            await User.findOneAndUpdate({username: req.user.username}, {
                $set: {
                    items: currentItems,
                    coins: currentCoins - 50
                }
            })
            console.log(await User.findOne({username: req.user.username}))
            console.log("BOUGHT POWER UP 2")
            res.redirect('/items')
            break;
            case '3':
            console.log('Initializing Buy Power Up 3')
            currentItems.push('powerup3')
            if (currentCoins < 50) {
                return res.redirect('/items')
            }
            await User.findOneAndUpdate({username: req.user.username}, {
                $set: {
                    items: currentItems,
                    coins: currentCoins - 50
                }
            })
            console.log(await User.findOne({username: req.user.username}))
            console.log("BOUGHT POWER UP 3")
            res.redirect('/items')
            break;
        case '4':
            console.log('Initializing Buy Power Up 4')
            currentItems.push('powerup4')
            if (currentCoins < 50) {
                return res.redirect('/items')
            }
            await User.findOneAndUpdate({username: req.user.username}, {
                $set: {
                    items: currentItems,
                    coins: currentCoins - 50
                }
            })
            console.log(await User.findOne({username: req.user.username}))
            console.log("BOUGHT POWER UP 4")
            res.redirect('/items')
            break;
    }
})

module.exports = router