const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3000;

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
app.post('/register', (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  // Read existing users data from JSON file
  fs.readFile('./test/users.json', 'utf8', (err, data) => {
    if (err) throw err;

    const users = JSON.parse(data);

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.send('User already exists');
    }

    // Add new user to users array
    const newUser = { email, firstName, lastName, password };
    users.push(newUser);

    // Write updated users data back to JSON file
    fs.writeFile('./test/users.json', JSON.stringify(users), 'utf8', (err) => {
      if (err) throw err;

      res.redirect('/login');
    });
  });
});

// Start the server
app.get('/login', (req, res) => {
  res.sendFile('/test/login.html', { root: './' });
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Read user data from JSON file
    fs.readFile('./test/users.json', 'utf8', (err, data) => {
      if (err) throw err;
  
      const users = JSON.parse(data);
      const validUser = users.find(user => user.email === email && user.password === password);
  
      if (validUser) {
        // Store user data in session
        req.session.user = validUser;
        // Redirect to dashboard
        res.redirect('/dashboard');
      } else {
        res.send('Incorrect username or password');
      }
    });
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
