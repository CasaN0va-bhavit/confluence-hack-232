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
    allPrizes.sort(function(b, a){return b-a});
    allPrizes.reverse()
    console.log(allPrizes)
    var top7Teams = []
    async function pushTop7(index) {
    for (let i = 0; i < allTeams.length; i++) {
        if (!top7Teams.includes(allTeams[i]) && allTeams[i].points === allPrizes[parseInt(index)])
            top7Teams.push(allTeams[i])
        }
    }
    pushTop7(0)
    pushTop7(1)
    pushTop7(2)
    pushTop7(3)
    pushTop7(4)
    pushTop7(5)
    pushTop7(6)
    console.log(top7Teams)
    res.render('leaderboard', {top7Teams: top7Teams, user: req.user})
});

module.exports = router;