const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
// Set EJS as the view engine
app.use(express.static('./ejs_respons/public'))
// app.use(express.static(path.join(__dirname,'/public')))
// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
