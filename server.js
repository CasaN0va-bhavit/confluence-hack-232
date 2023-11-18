require('dotenv').config()

const express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    app = express(),
    flash = require('express-flash'),
    session = require('cookie-session'),
    PORT = process.env.PORT || 5000,
    passportInit = require('./utils/passport-config')

const indexRouter = require('./routers/indexRouter'),
    regRouter = require('./routers/regRouter')
    loginRouter = require('./routers/loginRouter')
    dashboardRouter = require('./routers/dashboardRouter')
    leaderboardRouter = require('./routers/leaderboardRouter')
    adminRouter = require('./routers/adminRouter')
    hackSubRouter = require('./routers/hackSubRouter'),
    itemsRouter = require('./routers/shopRouter')

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
app.use('/login', loginRouter)
app.use('/register', regRouter)
app.use('/dashboard', dashboardRouter)
app.use('/leaderboard', leaderboardRouter)
app.use('/admin', adminRouter)
app.use('/hack', hackSubRouter)
app.use('/items', itemsRouter)

app.listen(PORT, console.log(`SERVER CONNECTED ON PORT ${PORT}`))