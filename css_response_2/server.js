// without using express.static middleware

const express = require('express');
//const path = require('path');
const app = express();
const port = 3000;
  
// Define routes
app.get('/', (req, res) => {
    res.sendFile('index.html',{root:'./css_response_2'});
});

// Serve CSS file
app.get('/styles.css', (req, res) => {
    res.sendFile('css_response_2/styles.css',{root:'./'});
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
