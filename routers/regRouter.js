const router = require('express').Router()
const User = require('../schemas/userSchema.js')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/', async (req, res) => {
    const {username, fname, lname, password, cnfpassword} = req.body
    const foundUser = await User.findOne({username})
    if (!username || !password || !fname || !lname || !cnfpassword) {
        return res.render('register', {error: 'Please enter all the credentials'})
    }
    if (password !== cnfpassword) {
        return res.render('register', {error: 'The passwords do not match!'})
    }
    if (foundUser) return res.render('register', {error: "A user already exists with this username."})
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        username: username,
        fname: fname,
        lname: lname,
        password: hashedPassword
    })
    await newUser.save()
    console.log(`ACCOUNT CREATED`)
    res.redirect('/')
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router