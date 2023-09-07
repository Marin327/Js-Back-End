const  privateUserData = require('../private');

module.exports = {
    development: {
        port: process.env.PORT || 3000,
        databaseUrl: `mongodb+srv://${privateUserData.user}:${privateUserData.password}@softuni-dx3ut.mongodb.net/${privateUserData.database}?retryWrites=true&w=majority`
    },
    production: {}
};