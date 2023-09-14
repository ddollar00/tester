// HTTP Methods
const http = require("http");
const url = require('url');
const PORT = 3000;
const { createLogger, transports, format } = require('winston');


// create the logger
const logger = createLogger({
    level: 'info', // this will log only messages with the level 'info' and above
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(), // log to the console
        new transports.File({ filename: 'info.log', level: 'info' }),
        new transports.File({ filename: 'error.log', level: 'error' })
    ]
});
const groc = [];
const server = http.createServer((req, res) => {

    // GET
    if (req.method === 'GET' && req.url === '/api/data') {

        res.writeHead(200, { 'Content-Type': 'application/json' });

        res.end(JSON.stringify(groc));
        logger.info(" Get " + JSON.stringify(groc));

        //POST
    } else if (req.method === 'POST' && req.url === '/api/add') {

        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {

            const item = JSON.parse(body);
            groc.push(item);
            logger.info(" ADD " + JSON.stringify(item));
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
            if (Number(data) > groc.length) {

                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
                logger.error(" Edit ID not found " + data);
            } else {
                groc[Number(data) - 1].bought = !groc[Number(data) - 1].bought;

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'item bought status changed!' }));
                logger.info(" Edit" + JSON.stringify(groc[Number(data) - 1]));
            }

        });

        logger.error("Edit index does not exist");

    }

    else if (req.method === "DELETE" && req.url === '/api/remove') {

        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {

            const data = JSON.parse(body);
            if (Number(data) > groc.length) {

                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
                logger.error(" DELETE ID not found " + data);
            } else {
                groc.splice(Number(data) - 1, 1);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'item has been deleted!' }));
                logger.info(" Delete" + JSON.stringify(groc[Number(data) - 1]));
            }

        });



    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }

});

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});