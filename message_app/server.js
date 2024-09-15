const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const uri = 'mongodb+srv://USER:PASSWORD@cluster.mongodb.net/registration?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.on('error', (error) => {
//   console.log('MongoDB connection error:', error);
// });
// Define user schema
const userSchema = new mongoose.Schema({
  from: String,
  to: String,
  message: String
});
const User = mongoose.model('Registered_users', userSchema);
// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file on the / endpoint
app.get('/', (req, res) => {
    res.sendFile('index.html',{root:__dirname})
})

// Handle form submission
app.post('/send', (req, res) => {
    // Destructure form data
    const { from, to, message } = req.body;
    
    // Handle form data (for demonstration, just logging)
    console.log('From:', from);
    console.log('To:', to);
    console.log('Message:', message);
    
    // Send a response
    res.send('Form submitted successfully!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
