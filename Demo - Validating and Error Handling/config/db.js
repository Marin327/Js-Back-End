const config = require('./config');

const mangoose = require('mangoose');

module.exports = () => {
    return mangoose.connect(config.dbURL)
};