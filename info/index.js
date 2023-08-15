const _ = require('lodash');
const fileManager = require('./fileManager');
const a = require('./dir');

fileManager.readUsers(function(err, content) {
    if (err) {
        console.log(err);
        return;
    } else {
        const userArray = content.split(',');
        console.log(_.chunk(userArray, 2));
    }
});