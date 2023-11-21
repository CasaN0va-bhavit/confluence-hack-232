// to change line 16

const User = require('../schemas/userSchema');
const router = require('express').Router();
const hacks = require('../schemas/hackSubSchema');
const teams = require('../schemas/teamSchema');

router.get('/', async (req,res) => {
    const allTeams = await teams.find({});
    var error = ""
    var flag = false;
    var reqTeam;
    for (let i = 0; i < allTeams.length; i++) {
        if (req.user.username === allTeams[i].participant1 || req.user.username === allTeams[i].participant2 || req.user.username === allTeams[i].participant3 || req.user.username === allTeams[i].participant4 || req.user.username === allTeams[i].teamAdmin) {
            if (req.user.username === allTeams[i].teamAdmin) {
                console.log("Im a team admin")
                flag = true;
                reqTeam = allTeams[i]
            } else {
                console.log("Im not a team admin")
                error = "Please ask your team admin " + allTeams[i].teamAdmin + " to make a submission."
                flag = true;
            }
        }
    }
    if (!flag) {
        error = "Please add yourself/make a team to make a hack submission."
    }

    res.render('hackSubmission', {error: error, reqTeam: reqTeam});
})

router.post('/post', async (req,res) => {
    const {submissionLink, gdLink} = req.body;
    const allTeams = teams.find({});
    for (let i = 0; i < allTeams.length; i++) {
        if (req.user.email === allTeams[i].participant1 || req.user.email === allTeams[i].participant2 || req.user.email === allTeams[i].participant3 || req.user.email === allTeams[i].participant4) {
            
        }
    }
    if (req.body.images) {
        const images = req.body.images
        const newSubmission = new hacks({
            teamName: req.user.username,
            submissionLink: submissionLink,
            gdLink: gdLink,
            images: images
        });
        await newSubmission.save()
        console.log('HACK SUBMISSION TAKEN')
    } else{
        const newSubmission = new hacks({
            username: req.user.username,
            submissionLink: submissionLink,
            gdLink: gdLink,
        });
        await newSubmission.save()
        console.log('HACK SUBMISSION TAKEN')
    }

    res.redirect('/admin');
});

module.exports = router;