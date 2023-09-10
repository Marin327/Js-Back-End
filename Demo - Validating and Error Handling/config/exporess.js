const exporess = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const cookiePerson = require('cookie-parser');
//const bodyParser = require('body-parser');
const secret = 'secret';

module.exports = (app) => {
    app.use(express./urlencoded({ extended: false }));
    app.use(cookieparser(secret));
    app.use(express.static(path.resolve(__basedir, 'static')));
    app.engine('.hbs', path.resolve(__basedir, ' views'));
    app.set('views', path.resolve(__basedir, 'views'));
};