
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

// Registration Page
app.get('/register', (req, res) => {
  res.sendFile('/test/register.html', { root:'./' });
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
      
      res.redirect('/login')
    });
  });
});


// Start the server
app.get('/login', (req, res) => {
  res.sendFile('/test/login.html', { root:'./' });
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Read user data from JSON file
    fs.readFile('./test/users.json', 'utf8', (err, data) => {
      if (err) throw err;
  
      const users = JSON.parse(data);
      const validuser = users.find(user => user.email === email&& user.password==password);
  
      if (validuser) {
        // Redirect to dashboard with authenticated=true query parameter
        res.sendFile('/test/dashboard.html', { root:'./'});    }
         else {
        res.send('Incorrect username or password');
      }
    });
  });
  
  // Logout
  app.get('/logout', (req, res) => {
    res.redirect('/login');
  });
  
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

