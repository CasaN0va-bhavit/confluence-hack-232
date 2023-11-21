const router = require('express').Router();
const teams = require('../schemas/teamSchema');
const User = require('../schemas/userSchema');
const {sendMail} = require('../utils/mailHelper')
const ejs = require('ejs')

router.get('/', async (req,res) => {
    var canReg = true;
    const allTeams = await teams.find({});
    var reqTeam;
    console.log(req.user.username)
    for (let i = 0; i < allTeams.length; i++) {
        if (req.user.username === allTeams[i].participant1 || req.user.username === allTeams[i].participant2 || req.user.username === allTeams[i].participant3 || req.user.username === allTeams[i].participant4 || req.user.username === allTeams[i].teamAdmin) {
            canReg = false
            console.log('cannot register')
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

router.post('/create-team', async (req,res) => {
    const {teamName,  participant1} = req.body
    const foundTeam = await teams.find({})
    var error = ""
    console.log(req.body)
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
                teamAdmin: req.user.username
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
                teamAdmin: req.user.username
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
                teamAdmin: req.user.username
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
        }
    } else {
        res.render('hackReg', {canReg: true, user: req.user, reqTeam: false, error: "Please enter a participant", canEdit: true});
    }
});

router.post('/editTeam/:id', async (req,res) => {
    const {teamName,  participant1} = req.body
    if (req.body.participant2 !== undefined || req.body.participant2 !== "") {
        await teams.findByIdAndUpdate(req.params.id, {
            $set: {
                teamName: teamName,
                participant1: participant1,
                participant2: req.body.participant2   
            }
        });
    }
    else if (req.body.participant3 !== undefined || req.body.participant3 !== "") {
        await teams.findByIdAndUpdate(req.params.id, {
            $set: {
                teamName: teamName,
                participant1: participant1,
                participant2: req.body.participant2,
                participant3: req.body.participant3  
            }
        });
    }
    else if (req.body.participant4 !== undefined || req.body.participant4 !== "") {
        await teams.findByIdAndUpdate(req.params.id, {
            $set: {
                teamName: teamName,
                participant1: participant1,
                participant2: req.body.participant2,
                participant3: req.body.participant3,
                participant4: req.body.participant4
            }
        });
    } else {
        await teams.findByIdAndUpdate(req.params.id, {
            $set: {
                teamName: teamName,
                participant1: participant1,
            }
        });
    }
    res.redirect('/hackReg');
});

module.exports = router;