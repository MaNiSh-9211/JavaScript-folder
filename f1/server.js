
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3001;

// Middleware to parse JSON body
//app.use(express.json());/// 1
app.use(express.urlencoded({ extended: true }));//2
//app.use(express.static('public'));

// Task 1: Create server
app.listen(PORT, (err) => {
    if (err) {
        console.error('Unable to start the server:', err);
    } else {
        console.log(`Server has started at port ${PORT}`);
    }
}); 

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, phone } = req.body;
console.log(req.body.name);
    // Read user.json file
    fs.readFile('./f1/user.json', (err, data) => {
        if (err) {
            console.error('Error reading user.json:', err);
            //res.status(500).send('Internal Server Error');
            return;
        }

      let users =JSON.parse(data);
        const newUser = {
            name: name,
            email: email,
            phone: phone
        };
        users.push(newUser);

        // Write updated data back to user.json
        fs.writeFile('./f1/user.json', JSON.stringify(users), (err) => {
            if (err) {
                console.error('Error writing to user.json:', err);
                //res.status(500).send('Internal Server Error');
                return;
            }
            
            // Send response confirming successful submission
            res.send('Form submitted successfully. Your data has been logged to the console.');

            // Log submitted data to the console in tabular form
            console.table(users);//newUsers

            // No need to send any additional data to the response
            res.end();
        });
    });
});

// 11111111
// That's correct. Without the express.json() middleware, the req.body object will not be automatically 
// populated with the parsed JSON data from incoming requests. This means that if you attempt to access 
// req.body within your route handlers, it will be undefined for requests that contain JSON payloads.

//222222222
// Handling Form Submissions: When a form is submitted from a web page, the data is typically sent to 
// the server in a URL-encoded format. This middleware allows Express to parse this data and make it 
// accessible within route handlers.

// Accessing Form Data: By using express.urlencoded(), the server can easily access form data submitted 
// by users through HTML forms. This includes data submitted via methods like POST or PUT requests.

// Populating req.body: Similar to express.json(), which parses JSON data, express.urlencoded() parses 
// URL-encoded data from the request body and populates the req.body object. This makes it convenient
//  for developers to access form data within their route handlers.

// Handling Key-Value Pairs: URL-encoded data consists of key-value pairs separated by '&' symbols, 
// with keys and values encoded to handle special characters properly. This middleware takes care of 
// decoding these values and makes them accessible in req.body as a JavaScript object.