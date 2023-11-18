// to change line 16

const User = require('../schemas/userSchema');
const router = require('express').Router();
const hacks = require('../schemas/hackSubSchema');
const teams = require('../schemas/teamSchema');

router.get('/', async (req,res) => {
    res.render('hackSubmission');
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