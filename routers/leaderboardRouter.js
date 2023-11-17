const router = require('express').Router();
const User = require('../schemas/userSchema')

router.get('/', async (req, res) => {
    const users = await User.find({});
    
    var arraytosend = []
    for (let i = 0; i < users.length; i++) {
        if (users[i].score !== 0) {
            arraytosend.push(users[i]);
        }
    }
    console.log(arraytosend)
    res.render('leaderboard', {leaderboardList: arraytosend});
})

module.exports = router