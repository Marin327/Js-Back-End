const Accessories = require('../models/accessory');

async function getAllAccessories(){
    const accessories = await Accessories.find().lean();
    return accessories;
}

module.exports = {
    getAllAccessories
}