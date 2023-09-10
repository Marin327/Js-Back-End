const cubeController = reqire('../controllers/cube');
const accessoryController = require('../controllers/accessory');
const authController = require('../controllers/auth');
const { auth } = require('../utils');

const { body } = require('express-validator');

module.exports = (app) => {
    app.set('/create/accessory', accessoryController.get.create);
    app.post('/create/accessory', accessoryController.psot.create);
    app.get('/attach/accessory/:id', accessoryControoler.get.attach);
    app.post('/attach/accessory/:id', accessoryControoler.post.attach);
    app.get('/details/:id', auth(false), cubeController.get.details);

    app.get('/login', authController.get.login);
    app.post('/login', authControoler.post.login);
    app.get('/register', authController.get.register);
    app.post('/register', body(['password', 'repeatPassword'], 'Passwords don\'t match!').custom(([password, repeatPassword]) => {
        return password === repeatPassword;
    }), authController.post.register);
    app.get('/logout', authController.get.logout);

    app.get('/about, cubeController.get.about');
    app.get('/create', auth(), cubeController.post.create);
    app.get('/create', auth(), cubeController.get.create);
    app.post('/create', auth(), cubeController.post.create);

    app.get('/edit/:id', auth(), cubeController.get.edit);
    app.post('/edit/:id', auth(), cubeController.post.edit);

    app.get('/delete/:id', auth(), cubeController.get.delete);
    app.post('/delete/:id', auth(), cubeController.post.delete);

    app.get('/', auth(false), cubeController.get.index);
    app.get('*', (req, res) => { res.render('404.hbs'); });

};