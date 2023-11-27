const router = require('express').Router();
const { error } = require('console');
const teams = require('../schemas/teamSchema');
const User = require('../schemas/userSchema');
const {sendMail} = require('../utils/mailHelper')
const ejs = require('ejs');
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }

})
const upload = multer({
    storage: storage
})
router.get('/', async (req,res) => {
    var canReg = true;
    const allTeams = await teams.find({});
    var reqTeam;
    // console.log(req.user.username)
    for (let i = 0; i < allTeams.length; i++) {
        if (req.user.username === allTeams[i].participant1 || req.user.username === allTeams[i].participant2 || req.user.username === allTeams[i].participant3 || req.user.username === allTeams[i].participant4 || req.user.username === allTeams[i].teamAdmin) {
            canReg = false
            // console.log('cannot register')
            reqTeam = allTeams[i]
        }
    }
    var canEdit = false;
    if (reqTeam) {
        if (reqTeam.teamAdmin === req.user.username) {
            canEdit = true
        }
    }
    res.render('hackReg', {canReg: canReg, user: req.user, reqTeam: reqTeam, error: "", canEdit: canEdit});
});

router.post('/create-team', upload.single('teamPfp'), async (req,res) => {
    const {teamName,  participant1} = req.body
    const foundTeam = await teams.find({})
    var fileName;
    var error = ""
    if(!req.file) {
        error = "Please upload a profile picture of your team";   
    }
    if(teamName.length > 15) {
        error = "The limit for the team name is only 15 characters.";   
    }
    if (error.length === 0) {
        fileName = req.file.filename
    } else {
        fileName = null
    }
    // console.log(req.body)
    async function someFunction (participant) {
        const foundUserName = await User.findOne({username: participant})
        console.log(participant)
        if (!foundUserName) {
            error = "One or more of your participants do not exist!"
        }
        for (let i = 0; i < foundTeam.length; i++) {
            console.log("ITERATED")
            if (foundTeam[i].participant1 === participant || foundTeam[i].participant2 === participant || foundTeam[i].participant3 === participant || foundTeam[i].participant4 === participant || foundTeam[i].teamAdmin === participant) {
                console.log("FOUND")
                error = "Please ensure that none of the participants are already in a team!"
            }
            if (req.body.teamName === foundTeam[i].teamName) {
                error = "This team name is already taken! Please choose a unique team name."
            }
        }   
        console.log("Error: " + error)
    }
    console.log(req.body.participant4 !== undefined)
    if (req.body.participant4 !== "") {
        console.log("PARTICIPANT 4")
        await someFunction(req.body.participant4)
        await someFunction(req.body.participant3)
        await someFunction(req.body.participant2)
        await someFunction(participant1)
        console.log("This is the error: " + error)
        if (error.length > 0) {
            return res.render('hackReg', {canReg: true, user: req.user, reqTeam: false, error: error, canEdit: true})
        } else {
            const newTeam = new teams({
                teamName: teamName,
                participant1: participant1,
                participant2: req.body.participant2,
                participant3: req.body.participant3,
                participant4: req.body.participant4,
                teamAdmin: req.user.username,
                teamPfp: fileName,
                points: 0
            });
            await newTeam.save()
            await sendMail(
                req.body.participant1, 
                `You Have Been Added To Team ${teamName}`, 
                `You Have Been Added To Team ${teamName}`, 
                await ejs.renderFile(__dirname + "/../views/normalTeamEmail.ejs", {
                    teamName: teamName,
                    teamAdmin: req.user.username,
                    participant1: participant1,
                    participant2: req.body.participant2,
                    participant3: req.body.participant3,
                    participant4: req.body.participant4,
                    domainName: process.env.DOMAIN_NAME
                })
            )
            await sendMail(
                req.body.participant2, 
                `You Have Been Added To Team ${teamName}`, 
                `You Have Been Added To Team ${teamName}`, 
                await ejs.renderFile(__dirname + "/../views/normalTeamEmail.ejs", {
                    teamName: teamName,
                    teamAdmin: req.user.username,
                    participant1: participant1,
                    participant2: req.body.participant2,
                    participant3: req.body.participant3,
                    participant4: req.body.participant4,
                    domainName: process.env.DOMAIN_NAME
                })
            )
            await sendMail(
                req.body.participant3, 
                `You Have Been Added To Team ${teamName}`, 
                `You Have Been Added To Team ${teamName}`, 
                await ejs.renderFile(__dirname + "/../views/normalTeamEmail.ejs", {
                    teamName: teamName,
                    teamAdmin: req.user.username,
                    participant1: participant1,
                    participant2: req.body.participant2,
                    participant3: req.body.participant3,
                    participant4: req.body.participant4,
                    domainName: process.env.DOMAIN_NAME
                })
            )
            await sendMail(
                req.body.participant4, 
                `You Have Been Added To Team ${teamName}`, 
                `You Have Been Added To Team ${teamName}`, 
                await ejs.renderFile(__dirname + "/../views/normalTeamEmail.ejs", {
                    teamName: teamName,
                    teamAdmin: req.user.username,
                    participant1: participant1,
                    participant2: req.body.participant2,
                    participant3: req.body.participant3,
                    participant4: req.body.participant4,
                    domainName: process.env.DOMAIN_NAME
                })
            )
            await sendMail(
                req.user.username, 
                `You Created the Team ${teamName}`, 
                `You Created the Team ${teamName}`, 
                await ejs.renderFile(__dirname + "/../views/adminEmail.ejs", {
                    teamName: teamName,
                    teamAdmin: req.user.username,
                    participant1: participant1,
                    participant2: req.body.participant2,
                    participant3: req.body.participant3,
                    participant4: req.body.participant4,
                    domainName: process.env.DOMAIN_NAME
                })
            )
            res.redirect('/hackReg')
        }
    }
    else if (req.body.participant3 !== "") {
        console.log("PARTICIPANT 3")
        await someFunction(req.body.participant3)
        await someFunction(req.body.participant2)
        await someFunction(participant1)
        console.log("This is the error: " + error)
        if (error.length > 0) {
            return res.render('hackReg', {canReg: true, user: req.user, reqTeam: false, error: error, canEdit: true})
        } else {
            const newTeam = new teams({
                teamName: teamName,
                participant1: participant1,
                participant2: req.body.participant2,
                participant3: req.body.participant3,
                teamAdmin: req.user.username,
                teamPfp: fileName,
                points: 0
            });
            await newTeam.save()
            await sendMail(
                req.body.participant1, 
                `You Have Been Added To Team ${teamName}`, 
                `You Have Been Added To Team ${teamName}`, 
                await ejs.renderFile(__dirname + "/../views/normalTeamEmail.ejs", {
                    teamName: teamName,
                    teamAdmin: req.user.username,
                    participant1: participant1,
                    participant2: req.body.participant2,
                    participant3: req.body.participant3,
                    participant4: null,
                    domainName: process.env.DOMAIN_NAME
                })
            )
            await sendMail(
                req.body.participant2, 
                `You Have Been Added To Team ${teamName}`, 
                `You Have Been Added To Team ${teamName}`, 
                await ejs.renderFile(__dirname + "/../views/normalTeamEmail.ejs", {
                    teamName: teamName,
                    teamAdmin: req.user.username,
                    participant1: participant1,
                    participant2: req.body.participant2,
                    participant3: req.body.participant3,
                    participant4: null,
                    domainName: process.env.DOMAIN_NAME
                })
            )
            await sendMail(
                req.body.participant1, 
                `You Have Been Added To Team ${teamName}`, 
                `You Have Been Added To Team ${teamName}`, 
                await ejs.renderFile(__dirname + "/../views/normalTeamEmail.ejs", {
                    teamName: teamName,
                    teamAdmin: req.user.username,
                    participant1: participant1,
                    participant2: req.body.participant2,
                    participant3: req.body.participant3,
                    participant4: null,
                    domainName: process.env.DOMAIN_NAME
                })
            )
            await sendMail(
                req.user.username, 
                `You Created the Team ${teamName}`, 
                `You Created the Team ${teamName}`, 
                await ejs.renderFile(__dirname + "/../views/adminEmail.ejs", {
                    teamName: teamName,
                    teamAdmin: req.user.username,
                    participant1: participant1,
                    participant2: req.body.participant2,
                    participant3: req.body.participant3,
                    participant4: req.body.participant4,
                    domainName: process.env.DOMAIN_NAME
                })
            )
            res.redirect('/hackReg')
        }
    }
    else if (req.body.participant2 !== "") {
        console.log("PARTICIPANT 2")
        await someFunction(req.body.participant2)
        await someFunction(participant1)
        console.log("This is the error: " + error)
        if (error.length > 0) {
            return res.render('hackReg', {canReg: true, user: req.user, reqTeam: false, error: error, canEdit: true})
        } else {
            const newTeam = new teams({
                teamName: teamName,
                participant1: participant1,
                teamAdmin: req.user.username,
                participant2: req.body.participant2,
                teamPfp: fileName,
                points: 0
            });
            await newTeam.save()
            await sendMail(
                req.body.participant1, 
                `You Have Been Added To Team ${teamName}`, 
                `You Have Been Added To Team ${teamName}`, 
                await ejs.renderFile(__dirname + "/../views/normalTeamEmail.ejs", {
                    teamName: teamName,
                    teamAdmin: req.user.username,
                    participant1: participant1,
                    participant2: req.body.participant2,
                    participant3: null,
                    participant4: null,
                    domainName: process.env.DOMAIN_NAME
                })
            )
            await sendMail(
                req.body.participant2, 
                `You Have Been Added To Team ${teamName}`, 
                `You Have Been Added To Team ${teamName}`, 
                await ejs.renderFile(__dirname + "/../views/normalTeamEmail.ejs", {
                    teamName: teamName,
                    teamAdmin: req.user.username,
                    participant1: participant1,
                    participant2: req.body.participant2,
                    participant3: null,
                    participant4: null,
                    domainName: process.env.DOMAIN_NAME
                })
            )
            await sendMail(
                req.user.username, 
                `You Created the Team ${teamName}`, 
                `You Created the Team ${teamName}`, 
                await ejs.renderFile(__dirname + "/../views/adminEmail.ejs", {
                    teamName: teamName,
                    teamAdmin: req.user.username,
                    participant1: participant1,
                    participant2: req.body.participant2,
                    participant3: req.body.participant3,
                    participant4: req.body.participant4,
                    domainName: process.env.DOMAIN_NAME
                })
            )
            res.redirect('/hackReg')
        }
    }
    else if (req.body.participant1 !== "") {
        console.log("PARTICIPANT 1")
        await someFunction(req.body.participant1)
        console.log("This is the error: " + error)
        if (error.length > 0) {
            return res.render('hackReg', {canReg: true, user: req.user, reqTeam: false, error: error, canEdit: true})
        } else {
            const newTeam = new teams({
                teamName: teamName,
                participant1: participant1,
                teamAdmin: req.user.username,
                teamPfp: fileName,
                points: 0
            });
            await newTeam.save()
            await sendMail(
                req.body.participant1, 
                `You Have Been Added To Team ${teamName}`, 
                `You Have Been Added To Team ${teamName}`, 
                await ejs.renderFile(__dirname + "/../views/normalTeamEmail.ejs", {
                    teamName: teamName,
                    teamAdmin: req.user.username,
                    participant1: participant1,
                    participant2: null,
                    participant3: null,
                    participant4: null,
                    domainName: process.env.DOMAIN_NAME
                })
            )
            res.redirect('/hackReg')
            await sendMail(
                req.user.username, 
                `You Created the Team ${teamName}`, 
                `You Created the Team ${teamName}`, 
                await ejs.renderFile(__dirname + "/../views/adminEmail.ejs", {
                    teamName: teamName,
                    teamAdmin: req.user.username,
                    participant1: participant1,
                    participant2: req.body.participant2,
                    participant3: req.body.participant3,
                    participant4: req.body.participant4,
                    domainName: process.env.DOMAIN_NAME
                })
            )
        }
    } else {
        res.render('hackReg', {canReg: true, user: req.user, reqTeam: false, error: "Please enter a participant", canEdit: true});
    }
});

router.post('/editTeam/:id', async (req,res) => {
    console.log(req.body)
    const reqTeam = await teams.findById(req.params.id);
    const renderError = (err) => {
        return res.render('hackReg', {canReg: false, user: req.user, error: err, reqTeam: reqTeam, canEdit: true})
    };
    if (!req.body.participant1) {
        return renderError("Participant 1 is required.")
    }
    if (!req.body.teamName) {
        return renderError("Team name is required.")
    }
    if (req.body.teamName.length > 15) {
        return renderError("The team name cannot be more than 15 characters.")
    }
    if (req.body.participant1) {
        const tempUser = await User.findOne({username: req.body.participant1})
        const allTeams = await teams.find({});
        for (let i = 0; i < allTeams.length; i++) {
            // console.log('here')
            if (allTeams[i].teamName !== reqTeam.teamName) {
                // console.log(allTeams[i].teamName, reqTeam.teamName)
                if (req.body.participant1 === allTeams[i].teamAdmin || req.body.participant1 === allTeams[i].participant1 || req.body.participant1 === allTeams[i].participant2 || req.body.participant1 === allTeams[i].participant3 || req.body.participant1 === allTeams[i].participant4) {                
                    // console.log(allTeams[i])
                    return renderError("One or more of your participants are already in a team.")
                }
            }
        }
        if (!tempUser) {
            return renderError("One or more of your participants aren't registered on our website.")
        }
    }
    if (req.body.participant2) {
        const tempUser2 = await User.findOne({username: req.body.participant2})
        const allTeams = await teams.find({});
        for (let i = 0; i < allTeams.length; i++) {
            // console.log('here')
            if (allTeams[i].teamName !== reqTeam.teamName) {
                // console.log(allTeams[i].teamName, reqTeam.teamName)
                if (req.body.participant2 === allTeams[i].teamAdmin || req.body.participant2 === allTeams[i].participant2 || req.body.participant2 === allTeams[i].participant3 || req.body.participant2 === allTeams[i].participant4 || req.body.participant2 === allTeams[i].participant1) {                
                    // console.log(allTeams[i])
                    return renderError("One or more of your participants are already in a team.")
                }
            }
        }
        console.log(tempUser2)
        if (tempUser2 === null) {
            return renderError("One or more of your participants aren't registered on our website.")
        }
    }
    if (req.body.participant3) {
        const tempUser3 = await User.findOne({username: req.body.participant3})
        const allTeams = await teams.find({});
        for (let i = 0; i < allTeams.length; i++) {
            // console.log('here')
            if (allTeams[i].teamName !== reqTeam.teamName) {
                // console.log(allTeams[i].teamName, reqTeam.teamName)
                if (req.body.participant3 === allTeams[i].teamAdmin || req.body.participant3 === allTeams[i].participant1 || req.body.participant3 === allTeams[i].participant2 || req.body.participant3 === allTeams[i].participant3 || req.body.participant3 === allTeams[i].participant4) {                
                    // console.log(allTeams[i])
                    return renderError("One or more of your participants are already in a team.")
                }
            }
        }
        if (!tempUser3) {
            return renderError("One or more of your participants aren't registered on our website.")
        }
    }
    if (req.body.participant4) {
        const allTeams = await teams.find({});
        for (let i = 0; i < allTeams.length; i++) {
            // console.log('here')
            if (allTeams[i].teamName !== reqTeam.teamName) {
                // console.log(allTeams[i].teamName, reqTeam.teamName)
                if (req.body.participant4 === allTeams[i].teamAdmin || req.body.participant4 === allTeams[i].participant4 || req.body.participant4 === allTeams[i].participant2 || req.body.participant4 === allTeams[i].participant3 || req.body.participant4 === allTeams[i].participant4) {                
                    // console.log(allTeams[i])
                    return renderError("One or more of your participants are already in a team.")
                }
            }
        }
        const tempUser4 = await User.findOne({username: req.body.participant4})
        if (!tempUser4) {
            return renderError("One or more of your participants aren't registered on our website.")
        }
    }
    await teams.findByIdAndUpdate(req.params.id, {
        $set: {
            participant1: req.body.participant1,
            participant2: req.body.participant2,
            participant3: req.body.participant3,
            participant4: req.body.participant4,
            teamName: req.body.teamName
        }
    })
    return res.redirect('/hackReg');
});

router.post('/leave/:id', async (req,res) => {
    const reqTeam = await teams.findById(req.params.id);
    async function checkParticipant(participant) {
        if (req.user.username === participant) {
            if (!reqTeam.participant2 && !reqTeam.participant3 && !reqTeam.participant4) {
                await teams.findByIdAndUpdate(req.params.id, {
                    $set: {
                        participant1: reqTeam.teamAdmin
                    }
                })
            } else {
                if (reqTeam.participant2 === participant) {
                    await teams.findByIdAndUpdate(req.params.id, {
                        $set: {
                            participant2: ""
                        }
                    })
                }
                if (reqTeam.participant3 === participant) {
                    await teams.findByIdAndUpdate(req.params.id, {
                        $set: {
                            participant3: ""
                        }
                    })
                }
                if (reqTeam.participant4 === participant) {
                    await teams.findByIdAndUpdate(req.params.id, {
                        $set: {
                            participant4: ""
                        }
                    })
                }
            }
        }
    }
    checkParticipant(reqTeam.participant1);
    checkParticipant(reqTeam.participant2)
    checkParticipant(reqTeam.participant3)
    checkParticipant(reqTeam.participant4)
    console.log('deleted user')
    await sendMail(
        reqTeam.teamAdmin, 
        `A person left your team!`, 
        `A person left your team!`, 
        await ejs.renderFile(__dirname + "/../views/leaveTeamEmail.ejs", {
            teamAdmin: reqTeam.teamAdmin,
            site: process.env.DOMAIN_NAME
        })
    )
    res.redirect('/hackReg')
});

module.exports = router;