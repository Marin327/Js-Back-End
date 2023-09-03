const config = require('../config/config');
const models = require('../models');

function getHome(req, res, next) {
    models.Course.find().then((courses) => {
        const hbsObject = {
            pageTitle: 'Home Page',
            isLoggedIn: req.cookies[config.cookie] !== undefined,
            username: req.cookies['username'],
            courses
        };
        res.render('homePage.hbs', hbsObject);
    });
}

module.exports = {
    getHome
};