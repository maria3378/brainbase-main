const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;
const filePath = path.join(__dirname, 'index_combined.html');

const server = http.createServer((req, res) => {
    console.log(`Received ${req.method} request for ${req.url}`);

    if (req.method === 'GET' && req.url === '/') {
        // Serve the HTML file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/html');
                res.end('<h1>500 - Internal Server Error</h1>');
                console.error('Error reading file:', err);
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>404 - Page Not Found</h1>');
    }
});

// Start the server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
