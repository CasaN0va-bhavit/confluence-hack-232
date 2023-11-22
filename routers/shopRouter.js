const router = require('express').Router()
const User = require('../schemas/userSchema')

router.get('/', async (req, res) => {
    // await User.updateOne({username: req.user.username}, {
    //     $set: {
    //         coins: 10000,
    //         items: []
    //     }
    // })
    console.log(await User.find({username: req.user.username}))
    res.render('items', {user: req.user, err: false})
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    const currentItems = req.user.items,
    currentCoins = req.user.coins
    switch (id) {
        case '1':
            console.log('Initializing Buy Power Up 1')
            if (currentCoins < 200) {
                return res.redirect('/shop/errLessCoins')
            }
            currentItems.push('powerup1')
            await User.findOneAndUpdate({username: req.user.username}, {
                $set: {
                    items: currentItems,
                    coins: currentCoins - 200
                }
            })
            console.log(await User.findOne({username: req.user.username}))
            console.log("BOUGHT POWER UP 1")
            res.redirect('/shop')
            break;
        case '2':
            console.log('Initializing Buy Power Up 2')
            if (currentCoins < 500) {
                return res.redirect('/shop/errLessCoins')
            }
            currentItems.push('powerup2')
            await User.findOneAndUpdate({username: req.user.username}, {
                $set: {
                    items: currentItems,
                    coins: currentCoins - 500
                }
            })
            console.log(await User.findOne({username: req.user.username}))
            console.log("BOUGHT POWER UP 2")
            res.redirect('/shop')
            break;
        case '3':
            console.log('Initializing Buy Power Up 3')
            if (currentCoins < 1000) {
                return res.redirect('/shop/errLessCoins')
            }
            currentItems.push('powerup3')
            await User.findOneAndUpdate({username: req.user.username}, {
                $set: {
                    items: currentItems,
                    coins: currentCoins - 1000
                }
            })
            console.log(await User.findOne({username: req.user.username}))
            console.log("BOUGHT POWER UP 3")
            res.redirect('/shop')
            break;
        case '4':
            console.log('Initializing Buy Power Up 4')
            if (currentCoins < 50) {
                return res.redirect('/shop/errLessCoins')
            }
            currentItems.push('powerup4')
            await User.findOneAndUpdate({username: req.user.username}, {
                $set: {
                    items: currentItems,
                    coins: currentCoins - 50
                }
            })
            console.log(await User.findOne({username: req.user.username}))
            console.log("BOUGHT POWER UP 4")
            res.redirect('/shop')
            break;
        case 'errLessCoins':
            return res.render('items', {user: req.user, err: "You must have enough coins to buy the item!"})
    }
})

module.exports = router