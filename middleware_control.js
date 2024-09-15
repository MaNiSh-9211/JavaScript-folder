// if we send req at invalid route:
// 1> Middleware inside app.use is executed
// 2>The middleware for error is executed
 
// if we send req at valid route:
// 1> Middleware inside app.use is executed
// 2> User-defined middleware inside app.get is executed

// but as in comment 4 the if the response is sent and the middleware is defined after the get function then iw will not exicute because
// the response is sent first so it means they exicute in order they are written and if they are after app.get then they will not exixute if
// response is sent;
const express = require('express');
const app = express();

// Middleware inside app.use
app.use((req, res, next) => {
    console.log('1st iddleware inside app.use is executed');
    next();
}); // Don't forget to close the parenthesis

// User-defined middleware for logging details
const logDetailsMiddleware = (req, res, next) => {
    console.log('2nd User-defined middleware inside app.get is executed');
    next();
};

// Route handler for /name endpoint
app.get('/name', logDetailsMiddleware, (req, res) => {
    res.send('John Doe');
});

// Route handler for /age endpoint
app.get('/age', logDetailsMiddleware, (req, res) => {
    res.send('30');
});

// Route handler for /address endpoint
app.get('/address', logDetailsMiddleware, (req, res) => {
    res.send('123 Main Street, City, Country');
});


app.use((req, res, next) => {///44444444
    console.log('3 Middleware inside app.use is executed');
    next();
}); // Don'



// Middleware for handling unmatched routes
const handle404ErrorMiddleware = (req, res, next) => {
    console.log(' 4 The middleware for error is executed');
    res.send("404");
};

// Using the 404 error handler middleware for any other endpoint
app.use(handle404ErrorMiddleware);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
