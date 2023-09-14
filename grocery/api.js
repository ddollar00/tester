// HTTP Methods
const http = require("http");
const url = require('url');
const PORT = 3000;
const groc = [];
const server = http.createServer((req, res) => {

    // GET
    if (req.method === 'GET' && req.url === '/api/data') {
        res.writeHead(200, { 'Content-Type': 'application/json' });

        res.end(JSON.stringify(groc));
        //POST
    } else if (req.method === 'POST' && req.url === '/api/add') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {

            const item = JSON.parse(body);
            groc.push(item);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'item added Successfully!' }));

        });
    }

    else if (req.method === "PUT" && req.url === '/api/edit') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {

            const data = JSON.parse(body);
            groc[Number(data) - 1].bought = !groc[Number(data) - 1].bought;

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'item bought status changed!' }));

        });
    }

    else if (req.method === "DELETE" && req.url === '/api/remove') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {

            const data = JSON.parse(body);
            groc.splice(Number(data) - 1, 1);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'item has been deleted!' }));

        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }

});

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});