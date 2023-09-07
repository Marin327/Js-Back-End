const express = require('express');
const cubeRouter = require('./routes/cubes');
const { connectDB } = require('./config/database');

const app = express();
connectDB();

app.use(express.json());

app.use('/api/cube', cubeRouter);

app.listen(3000, () => {
    console.log('REST API is running on port 3000');
});