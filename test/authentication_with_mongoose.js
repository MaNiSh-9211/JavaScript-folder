const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
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
  email: String,
  firstName: String,
  lastName: String,
  password: String,
});
const User = mongoose.model('Registered_users', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize express-session middleware
app.use(session({
  secret: 'secret-key', // Change this to a secure secret key
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000, // Session expires after 1 minute (60 seconds * 1000 milliseconds)
    secure: false // Change to true in production if using HTTPS
  }
}));

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
    res.send('Server Error');
  }
});

// Start the server
app.get('/login', (req, res) => {
  res.sendFile('/test/login.html', { root: './' });
});
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user in MongoDB
      const validUser = await User.findOne({ email, password });
  
      if (validUser) {
        // Store user data in session
        req.session.user = validUser;
        // Redirect to dashboard
        res.redirect('/dashboard');
      } else {
        res.send('Incorrect username or password');
      }
    } catch (err) {
      console.error(err);
      res.send('Server Error');
    }
  });
  
  // Dashboard
  app.get('/dashboard', (req, res) => {
    // Check if user is logged in
    if (req.session.user) {
      res.sendFile('/test/dashboard.html', { root: './'});
    } else {
      res.redirect('/login');
    }
  });
  
  // Logout
  app.get('/logout', (req, res) => {
    // Destroy session
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/login');
      }
    });
  });

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});



// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true,
//     validate: {
//       validator: (value) => {
//         // Custom email validation logic
//         // You can use regex or any other validation method
//         return /\S+@\S+\.\S+/.test(value);
//       },
//       message: 'Invalid email address'
//     },
//     // Define your other options here
//   },
//   // Define other fields and their options here
// });

// In this example:

// type: String: Specifies that the field is of type String.
// required: true: Makes the field required, meaning it must be provided when creating or updating a document.
// unique: true: Ensures that the value of the field is unique across all documents in the collection.
// lowercase: true: Converts the value of the field to lowercase before saving it to the database.
// trim: true: Removes leading and trailing whitespace from the value of the field.
// validate: Allows you to specify custom validation logic for the field. In this example, it checks whether the
//  provided value is a valid email address using a regular expression.
// You can add more options based on your specific requirements. Some additional options include default, 
// min, max, enum, index, sparse, select, immutable, etc.