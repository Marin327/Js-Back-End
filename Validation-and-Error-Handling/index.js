global.__basedir = __dirname;
const dbConnector = require('./config/db');

dbConnector().then(() => {
    const config = require('./config/config');
    const app = require('express')();
    require('./config/express')(app);
    require('./config/routes')(app);

    app.use(function (err, req, res, next) {
        console.error(err);
        res.render('500.hbs', { errorMessage: err.message });
    });

    app.listen(config.port, console.log(`Listening on port ${config.port}!`));
}).catch(console.error);