function print(text) {
    console.log('>>>' + text);
}
function printFancy(text) {
    console.log('>>>' + text + '<<<');
}

const data = [1, 2 , 3];

module.exports = {
    print,
    printFancy,
    data,
    number: 5
};
