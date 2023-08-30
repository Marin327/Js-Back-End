// const calc = require('./calc'); // default import
const { calc, multiply } = require('./calc')

console.log('outside init');
function init() {
    console.log('inside init');
    let result = calc(2, 3);
    console.log(result);
    console.log(multiply(2, 10));
}

init();