const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve the HTML form at the root endpoint
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const userData = req.body;

    // Log user submitted data
    console.log('User Submitted Data:');
    for (const key in userData) {
        console.log(`${key}: ${userData[key]}`);
    }

    // Append user data to users.json file
    fs.appendFile(__dirname + '/users.json', JSON.stringify(userData) + '\n', (err) => {
        if (err) {
            console.error('Error appending to users.json:', err);
            res.status(500).send('Error appending to users.json');
            return;
        }

        console.log('User data successfully appended to users.json');
        // Send response
        res.send('Form submitted successfully!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
