// 1. Sending Status Code with res.send()
app.get('/success', (req, res) => {
    res.status(200).send("OK - Success");
});


// 2. Sending JSON with res.json()
app.get('/data', (req, res) => {
    res.status(200).json({ message: "Request was successful", data: [1, 2, 3] });
});

// 3. Sending Only Status Code
app.get('/no-content', (req, res) => {
    res.sendStatus(204); // No content to send back
});

// 4. Custom Error Response
app.get('/not-found', (req, res) => {
    res.status(404).send("Not Found");
});

// 5. Using res.end() to End the Response
app.get('/custom-end', (req, res) => {
    res.status(500).end(); // Sends only the status code and ends the response
});

// 6. Handling Client Errors (400 Series)
app.get('/bad-request', (req, res) => {
    res.status(400).json({ error: "Bad Request" });
});

// 7. Redirect with 3xx Status Codes
app.get('/redirect', (req, res) => {
    res.redirect(301, 'https://example.com');  // Permanent redirect
});



res.send("hi")
res.json({ststus:"sucess"})
res.sendStstus(200);
res.sendFile('/path.html',{root:"./"});
res.ststus(400).send('hiii')
res.redirect('/new-url');  // Defaults to 302 (Found)
res.redirect(301, '/permanent-url');  // Permanent redirect
res.attachment('/path-to-file');  // Prompts user to download the file

// 1. res.end()
// This method ends the response process without sending any data or message body, useful when you just want to close the connection.

res.end();

// 6 res.download()
// This method is used to send a file for download. It is similar to res.sendFile(), but with a built-in download prompt.
res.download('/path-to-file', 'filename.txt', function(err) {
    if (err) {
        res.status(500).send("Error downloading file");
    }
});


// 7. res.render()
// If you are using a templating engine (like EJS, Pug, etc.), res.render() renders a view and sends the HTML to the client.

res.render('template-file', { title: 'Page Title', message: 'Hello!' });

// 8. res.set() (Custom Headers)
// You can set custom headers in the response using res.set() before sending a response.

res.set('Content-Type', 'application/json');
res.status(200).send({ message: 'This is JSON' });

// 9. res.cookie()
// Send a response that includes a cookie with the response headers.

res.cookie('session', '123456', { httpOnly: true });
res.send('Cookie has been set');

// 10. res.clearCookie()
// Clear an existing cookie before sending a response.

res.clearCookie('session');
res.send('Cookie cleared');

// 11. res.locals
// This allows passing local variables to the response, typically when rendering views.

res.locals.name = 'John';
res.render('template')

// 12. res.location()
// Sets the Location header without redirecting, used for sending location headers along with a status code (like for 201 Created).

res.location('/new-resource-url');
res.status(201).send('Resource created');