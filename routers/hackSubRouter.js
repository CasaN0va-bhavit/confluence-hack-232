// to change line 16

const User = require('../schemas/userSchema');
const router = require('express').Router();
const hacks = require('../schemas/hackSubSchema');
const teams = require('../schemas/teamSchema');
const multer = require('multer')
const path = require('path');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        if (file.fieldname === "env") {
            cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname))
        } else {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    }

})
const upload = multer({
    storage: storage
})


router.get('/', async (req,res) => {
    const allTeams = await teams.find({});
    var error = ""
    var flag = false;
    var reqTeam;
    var canSub = true;
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
    var reqID;
    const allHacks = await hacks.find({})
    for (let i = 0; i < allHacks.length; i ++) {
        console.log(allHacks[i])
        if (allHacks[i].teamName === reqTeam.teamName) {
            canSub = false;
            reqID = allHacks[i].id
        }
    }

    res.render('hackSubmission', {error: error, reqTeam: reqTeam, canSub: canSub, reqId: reqID});
})

const cpUpload = upload.fields([{ name: 'env', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }])
router.post('/post', cpUpload ,async (req,res) => {
    // console.log(req.files)
    var error = ""
    const allTeams = await teams.find({});
    var reqTeam;
    for (let i = 0; i < allTeams.length; i ++ ) {
        if (req.user.username === allTeams[i].teamAdmin) {
            reqTeam = allTeams[i]
        }
    }
    if (!req.body.submissionLink || !req.body.gdLink  || !req.files || !req.body.projectName || !req.body.desc) {
        error = "Please enter all the details."
        console.log(req.body.submissionLink, req.body.gdLink, req.body.projectName, req.body.desc)
        res.render('hackSubmission', {error: error, reqTeam: reqTeam, canSub: true, reqId: "dadadaasda"});
    } else {
        const {submissionLink, gdLink, projectName, desc} = req.body;
        const newHackSub = new hacks({
            teamName: reqTeam.teamName,
            submissionLink: submissionLink,
            gdLink: gdLink,
            thumbnail: req.files.thumbnail[0].filename,
            env: req.files.env[0].filename,
            projectName: projectName,
            desc: desc
        });
        await newHackSub.save();
        res.redirect('/hack');
    }
});

router.post('/delete/:id', async (req,res) => {
    await hacks.findByIdAndDelete(req.params.id);
    console.log('deleted hack submission' + req.params.id)
    res.redirect('/hack')
})

module.exports = router;