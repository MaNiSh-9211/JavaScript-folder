

const express = require('express');
const fs = require('fs');
const PORT = 3000;

const app = express();

let invalidRequestCount = 0;

// Middleware to log invalid requests and count them
app.use((req, res, next) => {
    if (req.url !== '/about' && req.url !== '/home' && req.url !== '/favicon.ico') {
        const currentDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const logEntry = `${req.url} requested at ${currentDate}`;
        fs.appendFileSync('./f2/errors.json', logEntry + '\n');
        invalidRequestCount++;
       // console.log(req.url);
    }
    next();
});

// Routes
app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/home', (req, res) => {
    res.send('Home Page');
});

app.get('/showrequest', (req, res) => {
   res.sendFile('errors.json',{root:__dirname})
});

// Catch-all route for invalid requests
app.get('*', (req, res) => {
    res.send(`Invalid request. Count: ${invalidRequestCount}`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// const http = require('http');
// const fs = require('fs');
// const url = require('url');

// const PORT = 3000;  
// let invalidRequestCount = 0;

// const server = http.createServer((req, res) => {
//     //const parsedUrl = url.parse(req.url, true);
//     //const pathname = parsedUrl.pathname;

//     // Log invalid requests and count
//     if (req.url !== '/about' &&req.url !== '/home'&&req.url !== '/favicon.ico') {
//         // Log invalid request to errors.log
//         const currentDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
//         const logEntry = `${req.url} requested at ${currentDate}`;
//         fs.appendFileSync('./f2/errors.json', logEntry + '\n');

//         // Increment invalid request count
//         invalidRequestCount++;
//         console.log(req.url);
//     }

//     // Endpoint /about
//     if (req.url== '/about') {
//         res.writeHead(200, { 'Content-Type': 'text/plain' });
            //or
//res.setHeader('Content-Type', 'text/plain');

//         res.end('About Page');
//     }

//     // Endpoint /home
//     else if (req.url== '/home') {
//         res.writeHead(200, { 'Content-Type': 'text/plain' });
//         res.end('Home Page');
//     }

//     // Endpoint /showrequest
//     else if (req.url === '/showrequest') {
//         // Read error.json file and send data to the client
//         fs.readFile('error.json', 'utf8', (err, data) => {
//             if (err) {
//                 res.writeHead(500, { 'Content-Type': 'text/plain' });
//                 res.end('Error reading error.json');
//             } else {
//                 res.writeHead(200, { 'Content-Type': 'application/json' });
//                 res.end(data);
//             }
//         });
//     }

//     // All other requests
//     else {
//         res.writeHead(200, { 'Content-Type': 'text/plain' });
//         res.end(`Invalid request. Count: ${invalidRequestCount}`);
//     }
// });

// // Start the server
// server.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });