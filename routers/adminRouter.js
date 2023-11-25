const User = require('../schemas/userSchema');
const teams = require('../schemas/teamSchema');
const router = require('express').Router();
const hacks = require('../schemas/hackSubSchema')

router.get('/', async (req,res) => {
    if (req.user.admin) {
        const hackSubmissions = await hacks.find({});
        console.log(hackSubmissions)
        res.render('admin', {username: req.user.fname, user: req.user, hackSubmissions: hackSubmissions})
    }
    else {
        res.redirect('/home');
    }
});

router.get('/submissions/:id', async (req,res) => {
    if (req.user.admin) {
        const reqSub = await hacks.findById(req.params.id);
        const reqTeam = await teams.findOne({teamName: reqSub.teamName});
        console.log(reqSub);
        console.log(reqTeam);
        res.render('submission', {submission: reqSub, reqTeam: reqTeam});
    }
    else {
        res.redirect('/home');
    }
});

router.post('/rank/:id', async (req,res) => {
    if (req.user.admin) {
        // const reqTeam = await teams.findOne({teamName: reqSub.teamName});
        console.log('this is ',req.body)
        const reqHack = await hacks.findById(req.params.id)
        await teams.findOneAndUpdate({teamName: reqHack.teamName}, {
            $set: {
                points: req.body.points
            }
        });
        res.redirect('/admin/submissions/'+req.params.id);
    }
    else {
        res.redirect('/home');
    }
});

module.exports = router