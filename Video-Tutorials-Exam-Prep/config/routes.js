const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const courseController = require('../controllers/courseController');
const auth = require('../utils/auth');
const courseValidator = require('../utils/validator');

module.exports = (app) => {
    // home routes
    app.get('/', homeController.getHome);
    app.get('/home', homeController.getHome);

    // login,register and logout routes
    app.get('/login', userController.getLogin);
    app.post('/login', userController.postLogin);

    app.get('/register', userController.getRegister);
    app.post('/register', userController.postRegister);

    app.get('/logout', userController.getLogout);

    // course routes
    app.get('/create', auth(), courseController.getCreate);
    app.post('/create', auth(), courseController.postCreate);

    app.get('/edit/:courseId', auth(), courseController.getEdit);
    app.post('/edit/:courseId', auth(), courseController.postEdit);

    app.get('/details/:courseId', auth(), courseController.getDetails);

    app.get('/delete/:courseId', auth(), courseController.deleteCourse);

    // handle non-existing routes
    app.get('*', (req, res, next) => {
        res.send('Page Not Found!');
    });
};