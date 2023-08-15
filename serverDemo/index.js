const http = require('http');
const { catalogController } = require('./controller/catalogController');
const { homeController, aboutController } = require('./controller/homeController');

const router = require('./router');

const server = http.createServer(router.main);

router.get('/', homeController);
router.get('/about', aboutController);
router.get('/catalog', catalogController);

router.post('/create', createController);

server.listen(3000);



