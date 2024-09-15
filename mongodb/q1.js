// User
// const newUser = new User({ name, email });
// where we are specifing key name
// ChatGPT
// In the line const newUser = new User({ name, email });, we are creating a new instance of the User model with the name 
// and email fields populated. This is a shorthand notation provided by JavaScript called "object literal shorthand".

// Here's how it works:

// When the keys and values have the same name, you can omit the key name if you are passing a variable with the same name 
// as the key. JavaScript will automatically interpret it as { name: name, email: email }.
// So, the line const newUser = new User({ name, email }); is equivalent to:


// const newUser = new User({ name: name, email: email });
// In this case:

// name is a variable holding the value entered in the form for the name field.
// email is a variable holding the value entered in the form for the email field.
// This shorthand notation makes the code cleaner and more concise, especially when the keys and values have the same name.


// USING MONGODB
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
async function connectToMongo() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}
connectToMongo();

// Express middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route to handle form submission
app.post('/submit', async (req, res) => {
    try {
        // Access the form data from the request body
        const { name, email } = req.body;

        // Access the MongoDB database
        const db = client.db('test');

        // Insert the form data into a collection
        const result = await db.collection('users').insertOne({ name, email });
        console.log('Inserted document with _id:', result.insertedId);

        // Redirect back to the form
        res.redirect('/');
    } catch (err) {
        console.error('Error handling form submission:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});









// USING MONGOOSE
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a Mongoose schema for the user data
const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

// Create a Mongoose model based on the schema
const User = mongoose.model('User', userSchema);

// Express middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route to handle form submission
app.post('/submit', async (req, res) => {
    try {
        // Access the form data from the request body
        const { name, email } = req.body;

        // Create a new user document using the Mongoose model
        const newUser = new User({ name, email });

        // Save the new user document to the MongoDB database
        await newUser.save();

        console.log('New user saved to MongoDB:', newUser);

        // Redirect back to the form
        res.redirect('/');
    } catch (err) {
        console.error('Error handling form submission:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});





//operation in mongoose

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a Mongoose schema for the user data
const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

// Create a Mongoose model based on the schema
const User = mongoose.model('User', userSchema);

// Express route to retrieve all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Express route to retrieve a single user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.json(user);
    } catch (err) {
        console.error('Error retrieving user by ID:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
//In this code:

// We define an Express route (/users) to retrieve all users from the database using User.find({}). This route returns an array
//  of all users in the database.
// We define another Express route (/users/:id) to retrieve a single user by their ID. We use User.findById() 
// to find the user by their MongoDB _id field.
// We handle errors gracefully and send appropriate HTTP status codes in the responses.