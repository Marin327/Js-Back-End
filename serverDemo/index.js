const http = require('http');
const fs = require('fs');

const { get, post, match } = require('./src/router'); 
const { home } = require('./src/contorllers/home');

get('/', home);
get('/catalog', catalog);
get('/create', creatGet);
post('./create', createPost);
get('./edit', editGet);
post('./edit', editPost);

http.createServer((req, res) => {
    if (req.url == '/favicon.ico') {
        fs.createReadStream('./static/favicon.ico').pipe(res);
    } else if(req.url.startsWith('/public/')) {
        fs.createReadStream(`./static${req.url.slice(8)}`).pipe(res);
    } else {
        match(req, res);
    }
}).listen(3000);