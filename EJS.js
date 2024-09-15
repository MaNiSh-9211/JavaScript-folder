const express = require('express');
const app = express();
const path = require('path');

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Define a route to render the index.ejs file
app.set('views','./')
app.get('/', (req, res) => {
    // Define the data object with multiple key-value pairs
    const data = {
        title: 'My Website',
        message: 'Welcome to my website!',
        author: 'John Doe'
    };

    // Render the index.ejs template with the provided data
    res.render('index',data);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// app.set() is the location of the views directory, which is where Express will look for the template files when rendering views.