const { Router } = require('express');
const Cube = require('../models/cube');


const router = Router();

router.get('/all', async (req, res) => {
    
    const cubes = await Cube.find().lean();

    res.status(200).json({
        cubes
    })
})
router.post('/new', (req, res) => {
    res.status(201).json({
        message: `${req.body.name} is saved successfuly`
    });
});


module.exports = router