const router = require('express').Router();
const teams = require('../schemas/teamSchema');

router.get('/', async (req,res) => {
    var canReg = true;
    const allTeams = teams.find({});
    for (let i = 0; i < allTeams.length; i++) {
        if (req.user.email === allTeams[i].participant1 || req.user.email === allTeams[i].participant2 || req.user.email === allTeams[i].participant3 || req.user.email === allTeams[i].participant4) {
            canReg = false
        }
    }
    res.render('hackReg', {canReg});
});

router.post('/create-team', async (req,res) => {
    const {teamName,  participant1} = req.body
    if (req.body.participant2 !== undefined || req.body.participant2 !== "") {
        const newTeam = new teams({
            teamName: teamName,
            participant1: participant1,
            participant2: req.body.participant2
        });
        await newTeam.save();
    }
    else if (req.body.participant3 !== undefined || req.body.participant3 !== "") {
        const newTeam = new teams({
            teamName: teamName,
            participant1: participant1,
            participant2: req.body.participant2,
            participant3: req.body.participant3
        });
        await newTeam.save();
    }
    else if (req.body.participant4 !== undefined || req.body.participant4 !== "") {
        const newTeam = new teams({
            teamName: teamName,
            participant1: participant1,
            participant2: req.body.participant2,
            participant3: req.body.participant3,
            participant4: req.body.participant4
        });
        await newTeam.save();
    } else {
        const newTeam = new teams({
            teamName: teamName,
            participant1: participant1
        });
        await newTeam.save();
    }
    res.redirect('/hackReg');
});

module.exports = router;