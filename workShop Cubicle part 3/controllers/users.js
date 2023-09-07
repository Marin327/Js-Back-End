const User = require('../models/user');
const privateData = require('../private');
const bscrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = privateData.privateKey;

async function addUser(req, res) {
    const { username, password } = req.body;

    const salt = bscrypt.genSaltSync(10);
    const hashPassword = bscrypt.hashSync(password, salt);

    const user = new User({ username, password: hashPassword });
    const userData = await user.save();

    const token = jwt.sign({
        userID: userData._id,
        username: userData.username
    }, privateKey);
    res.cookie('token', token);

    res.redirect('/');
}
async function verifyUser(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).lean();
    if (!user) {
        return res.redirect('/login?error=true');
    }
    const match = await bscrypt.compare(password, user.password);
    if (!match) {
        return res.redirect('/login?error=true');
    }
    const token = jwt.sign({
        userID: user._id,
        username: user.username
    }, privateKey);
    res.cookie('token', token);

    res.redirect('/');
}
function guestAuthorization(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/');
    }
    try {
        const user = jwt.verify(token, privateKey);
        next();
    }
    catch (e) {
        return res.redirect('/');
    }
}
function userAuthorization(req, res, next) {
    const token = req.cookies.token;
    try {
        jwt.verify(token, privateKey);
        return res.redirect('/');
    }
    catch {
        next();
    }
}
function getUserStatus(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        req.isLoggedIn = false;
    }
    try {
        jwt.verify(token, privateKey);
        req.isLoggedIn = true;
    }
    catch {
        req.isLoggedIn = false;
    }
    next();
}
function loadLoginPage(req, res) {
    const error = req.query.error
        ? 'Invalid params!'
        : null;
    return res.render('loginpage', {
        isLoggedIn: req.isLoggedIn,
        error
    });
}
function loadRegisterPage(req, res) {
    const error = req.query.error
        ? req.query.error
        : null;
    return res.render('registerPage', {
        isLoggedIn: req.isLoggedIn,
        error
    });
}
function logoutUser(req, res) {
    res.clearCookie('token');
    return res.redirect('/');
}
function inputStatus(req, res, next){
    const { username, password, repeatPassword } = req.body;
    if(username.length < 5){
        return res.redirect('/register?error=Username must be at least 5 characters long!');
    }
    if(!username.match(/^[A-Za-z0-9]+$/gm)){
        return res.redirect('/register?error=Username must contain letters and numbers only!')
    }
    if(password === ''){
        return res.redirect('/register?error=Password can not be empty!');
    }
    if(password !== repeatPassword){
        return res.redirect('/register?error=Password and Re-Password must be the same!');
    }
    next();
}

module.exports = {
    loadLoginPage,
    loadRegisterPage,
    logoutUser,
    addUser,
    verifyUser,
    guestAuthorization,
    userAuthorization,
    getUserStatus,
    inputStatus
}