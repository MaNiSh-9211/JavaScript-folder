const express = require('express');
const { MongoClient } = require('mongodb');
const session = require('express-session');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));

// MongoDB connection URI
const uri = 'mongodb+srv://USER:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority'
// Create a MongoDB client
const client = new MongoClient(uri);

// Connect to MongoDB
client.connect().then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

const db = client.db('registration'); // Get the database object

const userCollection = db.collection('kaku'); // Get the user collection

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 20000,
        secure: false
    }
}));

app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './test' });
});

app.post('/register', async (req, res) => {
    const { email, firstName, lastName, password } = req.body;
    try {
        const userExists = await userCollection.findOne({ email });
        if (userExists) {
            res.send('User already exists');
        } else {
            await userCollection.insertOne({ email, firstName, lastName, password });
        }
        res.redirect('/login');
    } catch (err) {
        console.log('Error:', err);
        res.send('Server error');
    }
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './test' });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const isValidUser = await userCollection.findOne({ email, password });
        if (isValidUser) {
            req.session.user = isValidUser;
            res.redirect('/dashboard');
        } else {
            res.send('Email or password is incorrect');
        }
    } catch (err) {
        console.log('Error:', err);
        res.send('Server error');
    }
});

app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.sendFile('dashboard.html', { root: './test' });
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error destroying session:', err);
        }
    });
    res.redirect('/login');
});

app.listen(port, (err) => {
    if (err) {
        console.log(`An error has occurred: ${err}`);
    } else {
        console.log(`Server is started on port: ${port}`);
    }
});
