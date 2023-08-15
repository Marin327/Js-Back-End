const xlsx = require('xlsx');
const fs = require('fs');

const util = require('./util');

util.print("Hello World");
util.printFancy("Again");

fs.writeFileSync('./output.txt', 'Hello world!')