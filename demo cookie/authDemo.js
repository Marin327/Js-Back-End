const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const hashedPassword = '38274932740132nsdfbasdljkfhalkjfha37438294932';
const saltRounds = 10;
const secret = 'mysupersecrets';

app.use(cookieParser());

app.get('/hash/:password?', async (req, res) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.params.password, salt);

    console.log('Salt:', salt);
    res.send('hash:', hash);
});

app.get('/login/:password', async (req, res) => {
   const isValidPassword = await bcrypt.compare(req.params.password, hashedPassword);

   if(isValidPassword) {
const payload = {
    username: 'Pesho'
};
const options = { expiresIn: "2d" };
const token = jwt.sign(payload, secret, options);

res.send(token);

   } else {
    res.send('Invalid Password');
   }
});

app.get('/verify/:token', (req, res)=> {
   jwt.verify(req.params.token, secret, (err, decodedToken) => {
if(err) {
    return res.status(401).send('Yoy don\'t have permissions')
   }
    res.json(decodedToken);
  });

});
app.listen(5000, () => console.log(`Server is listening ot port 5000`));