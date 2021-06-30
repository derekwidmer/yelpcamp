const User = require('../models/user')

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register')
}

module.exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const newUser = await User.register(user, password)
        req.login(newUser, err => { if (err) return next(err) })
        req.flash('success', 'Welcome to YelpCamp!')
        res.redirect('/campgrounds')
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.renderLoginPage = (req, res) => {
    res.render('users/login')
}

module.exports.login = async (req, res) => {
    req.flash('success', 'Welcome back!')
    const redirectURL = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo
    res.redirect(redirectURL)
}

module.exports.logout = (req, res) => {
    req.logout()
    req.flash('success', 'Logged out.')
    res.redirect('/campgrounds')
}