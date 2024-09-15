//auth_session_storage_momgo
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);//33
const shamodule = require('./sha');

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
  password: String
});
const User = mongoose.model('Registered_users', userSchema);
// the model function mongoose .model is used to create a class .when we call this function it return a class based on the
// passed collectionand schema. in this case the user variable represent a class. eac time we have to store a new
// document in mongodb we have to create an intsance of this user variable .each instance/object of user  represent a single documnet
// Initialize MongoDB session store
const store = new MongoDBStore({
  uri: uri,
  collection: 'sessions'
});

// Catch errors in MongoDB session store
store.on('error', function(error) {
  console.error(error);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize express-session middleware with MongoDB store
app.use(session({
  secret: 'secret-key', // Change this to a secure secret key
  resave: false,
  saveUninitialized: true,
  store: store,
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
  let { email, firstName, lastName, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send('User already exists');
    }

    password=await shamodule.sha(password)
    console.log('hashed password is :',password)
    const newUser = new User({ email, firstName, lastName, password });// shorthand so no need to enter key valur pair
    await newUser.save();

    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Login
app.get('/login', (req, res) => {
  res.sendFile('/test/login.html', { root: './' });
});
app.post('/login', async (req, res) => {
  let { email, password } = req.body;

  try {
    // Find user in MongoDB
    password=awaitshamodule.sha(password)
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
    res.status(500).send('Server Error');
  }
});

// Dashboard
app.get('/dashboard', (req, res) => {
  // Check if user is logged in
  if (req.session.user) {
    res.sendFile('/test/dashboard.html', { root: './' });
  } else {
    res.redirect('/login');
  }
});

// Logout
app.get('/logout', (req, res) => {
    // Get the session ID
    const sessionId = req.sessionID;
  
    // Destroy session from MongoDB
    store.destroy(sessionId, (err) => {
      if (err) {
        console.error('Error destroying session from MongoDB:', err);
      }
      // redirect from below because we are not ending response yest so below code statement will also run so they send responce to redirect 
      // to login page
      // Destroy session from server's memory
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
        } else {
          res.redirect('/login');
        }
      });
    });
  });

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});


//33
// Immediate Invocation: In your case, the module exports a function. By appending (session) immediately after require('connect-mongodb-
// session'), you are immediately invoking this function with the session object as an argument. by doing this we are configuring the 
//connect mongodb session with session features so the module can work seemlesly