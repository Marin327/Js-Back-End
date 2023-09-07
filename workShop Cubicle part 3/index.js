const env = process.env.NODE_ENV || 'development';

const mongoose = require('mongoose');
const config = require('./config/config')[env];
const express = require('express');
const app = express();

mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, databaseStatus);

require('./config/express')(app);
require('./router/routes')(app);

app.listen(config.port, console.log(`Listening on port ${config.port}!`));

function databaseStatus(err){
    if (err) {
        console.error(err);
        throw err;
    }
    console.log('Database is setup and running!');
}