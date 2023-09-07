const { searchHandler } = require('../controllers/filter');
const {
    addUser,
    verifyUser,
    guestAuthorization,
    userAuthorization,
    getUserStatus,
    loadLoginPage,
    loadRegisterPage,
    logoutUser,
    inputStatus
} = require('../controllers/users');
const {
    loadHomePage,
    loadEditPage,
    loadAboutpage,
    loadErrorPage,
    loadCreatePage,
    loadDeletePage,
    loadDetailsPage,
    loadAccessoryPage,
    loadAttachAccessoryPage,
    createCube,
    createAccessory,
    attachAccessory,
    deleteCube,
    editCube
} = require('./controllers/cubes');

module.exports = (app) => {
    app.get('/', getUserStatus, loadHomePage);
    app.get('/about', getUserStatus, loadAboutpage);
    app.get('/create', getUserStatus, guestAuthorization, loadCreatePage);
    app.post('/create', createCube);
    app.get('/create/accessory', getUserStatus, guestAuthorization, loadAccessoryPage);
    app.post('/create/accessory', createAccessory);
    app.get('/details/:id', getUserStatus, loadDetailsPage);
    app.get('/attach/accessory/:id', getUserStatus, guestAuthorization, loadAttachAccessoryPage);
    app.post('/attach/accessory/:id', attachAccessory);
    app.get('/search', getUserStatus, searchHandler);

    app.get('/edit/:id', guestAuthorization, getUserStatus, loadEditPage);
    app.post('/edit/:id', editCube);
    app.get('/delete/:id', guestAuthorization, getUserStatus, loadDeletePage);
    app.post('/delete/:id', deleteCube);

    app.get('/login', userAuthorization, getUserStatus, loadLoginPage);
    app.post('/login', verifyUser);
    app.get('/register', userAuthorization, getUserStatus, loadRegisterPage);
    app.post('/register', inputStatus, addUser);
    app.get('/logout', guestAuthorization, getUserStatus, logoutUser);

    app.get('*', loadErrorPage);
};
