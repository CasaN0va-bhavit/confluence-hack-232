const router = require('express').Router()
const User = require('../schemas/userSchema')
const teams = require('../schemas/teamSchema')

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
    const allTeams = await teams.find({})
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
            for (let i = 0; i < allTeams.length; i++) {
                if (req.user.username == allTeams[i].participant1 || req.user.username == allTeams[i].participant2 || req.user.username == allTeams[i].participant3 || req.user.username == allTeams[i].participant4 || req.user.username == allTeams[i].teamAdmin) {
                    const newPoints = allTeams[i].points + 100
                    await teams.findByIdAndUpdate(allTeams[i].id, {
                        $set: {
                            points: newPoints
                        }
                    })
                    console.log("BHAP BSDK")
                }
            }
            res.redirect('/shop')
            break;
        case '2':
            console.log('Initializing Buy Power Up 2')
            if (currentCoins < 400) {
                return res.redirect('/shop/errLessCoins')
            }
            currentItems.push('powerup2')
            await User.findOneAndUpdate({username: req.user.username}, {
                $set: {
                    items: currentItems,
                    coins: currentCoins - 400
                }
            })
            console.log(await User.findOne({username: req.user.username}))
            console.log("BOUGHT POWER UP 2")
            for (let i = 0; i < allTeams.length; i++) {
                if (req.user.username == allTeams[i].participant1 || req.user.username == allTeams[i].participant2 || req.user.username == allTeams[i].participant3 || req.user.username == allTeams[i].participant4 || req.user.username == allTeams[i].teamAdmin) {
                    const newPoints = allTeams[i].points + 200
                    await teams.findByIdAndUpdate(allTeams[i].id, {
                        $set: {
                            points: newPoints
                        }
                    })
                    console.log("BHAP BSDK")
                }
            }
            res.redirect('/shop')
            break;
        case '3':
            console.log('Initializing Buy Power Up 3')
            if (currentCoins < 600) {
                return res.redirect('/shop/errLessCoins')
            }
            currentItems.push('powerup3')
            await User.findOneAndUpdate({username: req.user.username}, {
                $set: {
                    items: currentItems,
                    coins: currentCoins - 600
                }
            })
            console.log(await User.findOne({username: req.user.username}))
            console.log("BOUGHT POWER UP 3")
            for (let i = 0; i < allTeams.length; i++) {
                if (req.user.username == allTeams[i].participant1 || req.user.username == allTeams[i].participant2 || req.user.username == allTeams[i].participant3 || req.user.username == allTeams[i].participant4 || req.user.username == allTeams[i].teamAdmin) {
                    const newPoints = allTeams[i].points + 300
                    await teams.findByIdAndUpdate(allTeams[i].id, {
                        $set: {
                            points: newPoints
                        }
                    })
                    console.log("BHAP BSDK")
                }
            }
            res.redirect('/shop')
            break;
        case '4':
            console.log('Initializing Buy Power Up 4')
            if (currentCoins < 400) {
                return res.redirect('/shop/errLessCoins')
            }
            currentItems.push('powerup4')
            await User.findOneAndUpdate({username: req.user.username}, {
                $set: {
                    items: currentItems,
                    coins: currentCoins - 400
                }
            })
            console.log(await User.findOne({username: req.user.username}))
            console.log("BOUGHT POWER UP 4")
            for (let i = 0; i < allTeams.length; i++) {
                if (req.user.username == allTeams[i].participant1 || req.user.username == allTeams[i].participant2 || req.user.username == allTeams[i].participant3 || req.user.username == allTeams[i].participant4 || req.user.username == allTeams[i].teamAdmin) {
                    const newTimeExtension = allTeams[i].timeExtension + 1
                    await teams.findByIdAndUpdate(allTeams[i].id, {
                        $set: {
                            timeExtension: newTimeExtension
                        }
                    })
                    console.log("BHAP BSDK")
                }
            }
            res.redirect('/shop')
            break;
        case '5':
            console.log('Initializing Buy Power Up 5')
            if (currentCoins < 800) {
                return res.redirect('/shop/errLessCoins')
            }
            currentItems.push('powerup5')
            await User.findOneAndUpdate({username: req.user.username}, {
                $set: {
                    items: currentItems,
                    coins: currentCoins - 800
                }
            })
            console.log(await User.findOne({username: req.user.username}))
            console.log("BOUGHT POWER UP 5")
            for (let i = 0; i < allTeams.length; i++) {
                if (req.user.username == allTeams[i].participant1 || req.user.username == allTeams[i].participant2 || req.user.username == allTeams[i].participant3 || req.user.username == allTeams[i].participant4 || req.user.username == allTeams[i].teamAdmin) {
                    const newTimeExtension = allTeams[i].timeExtension + 2
                    await teams.findByIdAndUpdate(allTeams[i].id, {
                        $set: {
                            timeExtension: newTimeExtension
                        }
                    })
                    console.log("BHAP BSDK")
                }
            }
            res.redirect('/shop')
            break;
        case '6':
            console.log('Initializing Buy Power Up 6')
            if (currentCoins < 1200) {
                return res.redirect('/shop/errLessCoins')
            }
            currentItems.push('powerup6')
            await User.findOneAndUpdate({username: req.user.username}, {
                $set: {
                    items: currentItems,
                    coins: currentCoins - 1200
                }
            })
            console.log(await User.findOne({username: req.user.username}))
            console.log("BOUGHT POWER UP 6")
            for (let i = 0; i < allTeams.length; i++) {
                if (req.user.username == allTeams[i].participant1 || req.user.username == allTeams[i].participant2 || req.user.username == allTeams[i].participant3 || req.user.username == allTeams[i].participant4 || req.user.username == allTeams[i].teamAdmin) {
                    const newTimeExtension = allTeams[i].timeExtension + 3
                    await teams.findByIdAndUpdate(allTeams[i].id, {
                        $set: {
                            timeExtension: newTimeExtension
                        }
                    })
                    console.log("BHAP BSDK")
                }
            }
            res.redirect('/shop')
            break;
        case 'errLessCoins':
            return res.render('items', {user: req.user, err: "You must have enough coins to buy the item!"})
    }
})

module.exports = router