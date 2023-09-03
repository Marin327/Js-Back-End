const models = require('../models');
const jwt = require('../utils/jwt');
const config = require('../config/config');

function getLogin(req, res, next) {
    res.render('loginPage.hbs', { pageTitle: 'Login Page' });
}

function postLogin(req, res, next) {
    const { username, password } = req.body;

    models.User.findOne({ username }).then((user) => {
        Promise.all([user, user.matchPassword(password)])
            .then(([user, match]) => {
                if (!match) {
                    console.log('Password is invalid!');
                    return;
                }

                const token = jwt.createToken({ id: user._id });
                res.cookie(config.cookie, token).cookie('username', user.username).redirect('/');
            });
    });
}

function getRegister(req, res, next) {
    res.render('registerPage.hbs', { pageTitle: 'Register Page' });
}

function postRegister(req, res, next) {
    const { username, password, repeatPassword } = req.body;

    models.User.create({ username, password }).then((registeredUser) => {
        const token = jwt.createToken({ id: registeredUser._id });

        res.cookie(config.cookie, token).redirect('/');
    });
}

function getLogout(req, res, next) {
    res.clearCookie(config.cookie).redirect('/');
}

module.exports = {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    getLogout
};
