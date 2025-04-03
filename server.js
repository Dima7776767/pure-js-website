const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const filePaths = {
        '/': 'views/index.html',
        '/style.css': 'public/style.css',
        '/script.js': 'public/script.js',
        '/server.js': 'server.js' // Добавил возможность просмотра кода сервера
    };

    if (filePaths[req.url]) {
        serveFile(res, filePaths[req.url], getContentType(req.url));
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

function getContentType(url) {
    if (url.endsWith('.css')) return 'text/css';
    if (url.endsWith('.js')) return 'text/javascript';
    return 'text/html';
}

function serveFile(res, filePath, contentType) {
    const fullPath = path.join(__dirname, filePath);
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading file');
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
