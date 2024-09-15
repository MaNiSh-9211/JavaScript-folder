const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const uri = 'mongodb+srv://USER:PASSWORD@cluster.mongodb.net/registration?retryWrites=true&w=majority';
// Connect to MongoDB
mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define user schema
const userSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
});
const User = mongoose.model('Registered_users', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

// Registration Page
app.get('/register', (req, res) => {
  res.sendFile('/test/register.html', { root: './' });
});

// Registration Process
app.post('/register', async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send('User already exists');
    }

    // Create new user in MongoDB
    const newUser = new User({ email, firstName, lastName, password });
    await newUser.save();

    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Login Page
app.get('/login', (req, res) => {
  res.sendFile('/test/login.html', { root: './' });
});

// Login Process
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user in MongoDB
    const validUser = await User.findOne({ email, password });

    if (validUser) {
      // Redirect to dashboard if login is successful
      res.redirect('/dashboard');
    } else {
      res.send('Incorrect username or password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Dashboard
app.get('/dashboard', (req, res) => {
  // Render dashboard if user is logged in
  res.sendFile('/test/dashboard.html', { root: './'});
});
app.get('/logout', (req, res) => {  
    // Render dashboard if user is logged in
    res.sendFile('/test/login.html', { root: './'});
  });
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
