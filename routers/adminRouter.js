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
        res.redirect('/');
    }
});

router.get('/submissions/:id', async (req,res) => {
    if (req.user.admin) {
        const reqSub = await hacks.findById(req.params.id);
        console.log(reqSub);
        res.render('submission', {submission: reqSub});
    }
    else {
        res.redirect('/');
    }
});

router.post('/rank/:id', async (req,res) => {
    if (req.user.admin) {
        const reqSub = await hacks.findById(req.params.id);
        console.log(reqSub);
        if (req.body.ranks === 1 || req.body.ranks === '1') {
            var price = 210000
        }
        if (req.body.ranks === 2 || req.body.ranks === '2') {
            var price = 140000
        }
        if (req.body.ranks === 3 || req.body.ranks === '3') {
            var price = 70000
        }
        console.log(req.body.ranks)
        await hacks.findOneAndUpdate({username: reqSub.username}, {
            $set: {
                rank: req.body.ranks,
                price: price
            }
        });
        res.redirect('/admin');
    }
    else {
        res.redirect('/');
    }
})

module.exports = router