const User = require('../schemas/userSchema');
const router = require('express').Router();
const hacks = require('../schemas/hackSubSchema');

router.get('/', async (req,res) => {
    res.render('hackSubmission');
})

router.post('/post', async (req,res) => {
    const {submissionLink, gdLink} = req.body;
    if (req.body.images) {
        const images = req.body.images
        const newSubmission = new hacks({
            username: req.user.username,
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