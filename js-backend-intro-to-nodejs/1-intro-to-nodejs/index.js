const http = require('http');
const port = 5000;

const server = http.createServer((req, res) => {
    // console.log('Method: ', req.method);
    // console.log('Url: ', req.url);
    // console.log('Headers: ', req.headers);

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    if (req.url == '/cats') {
        res.write('Some cats');
    } else if (req.url == '/dogs') {
        res.write('Some dogs');
    } else {
        res.write('<h1>Hello from NodeJS!</h1>');
    }
    
    res.end();
});

server.listen(port, () => console.log(`Server is listening on port ${port}...`));