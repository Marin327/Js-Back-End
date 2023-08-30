function calc(a ,b) {
    return a + b;
}

console.log('in calc');
// Default export
// module.exports = calc;

// Named export
exports.calc = calc;
exports.multiply = (a , b) => a * b;
