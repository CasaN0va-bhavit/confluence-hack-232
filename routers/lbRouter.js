const User = require('../schemas/userSchema');
const teams = require('../schemas/teamSchema');
const router = require('express').Router();
const hacks = require('../schemas/hackSubSchema')

router.get('/', async (req,res) => {
    const allTeams = await teams.find({});
    var allPrizes = []
    for (let i = 0; i < allTeams.length; i++) {
        allPrizes.push(allTeams[i].points);
    }
    allPrizes.sort()
    console.log(allPrizes)
    res.render('leaderboard')
});

module.exports = router;