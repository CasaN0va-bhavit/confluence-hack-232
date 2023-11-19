require('dotenv').config()

const express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    app = express(),
    flash = require('express-flash'),
    session = require('cookie-session'),
    PORT = process.env.PORT || 5000,
    passportInit = require('./utils/passport-config'),
    {ensureAuthenticated, forwardAuthenticated} = require('./utils/authenticate')

const indexRouter = require('./routers/indexRouter'),
    regRouter = require('./routers/regRouter')
    loginRouter = require('./routers/loginRouter')
    dashboardRouter = require('./routers/dashboardRouter')
    leaderboardRouter = require('./routers/leaderboardRouter')
    adminRouter = require('./routers/adminRouter')
    hackSubRouter = require('./routers/hackSubRouter'),
    itemsRouter = require('./routers/shopRouter'),
    hackRegRouter = require('./routers/hackReg'),
    logoutRouter = require('./routers/logoutRouter')

mongoose.connect(process.env.MONGO_URI, console.log('MONGODB CONNECTED'))

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(express.urlencoded({extended: false}))
app.use(express.json({limit: '1mb'}))

app.use(passport.initialize())
app.use(passport.session())
passportInit(passport)


app.use('/', indexRouter)
app.use('/login', forwardAuthenticated, loginRouter)
app.use('/register', forwardAuthenticated, regRouter)
app.use('/dashboard', ensureAuthenticated, dashboardRouter)
app.use('/leaderboard', ensureAuthenticated, leaderboardRouter)
app.use('/admin', ensureAuthenticated, adminRouter)
app.use('/hack', ensureAuthenticated, hackSubRouter)
app.use('/items', ensureAuthenticated, itemsRouter)
app.use('/hackReg', ensureAuthenticated, hackRegRouter)
app.use('/logout', ensureAuthenticated, logoutRouter)

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

app.listen(PORT, console.log(`SERVER CONNECTED ON PORT ${PORT}`))