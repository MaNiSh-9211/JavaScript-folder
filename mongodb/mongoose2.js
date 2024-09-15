// Connect to MongoDB:
// javascript
// Copy code
const mongoose = require('mongoose');

const uri = 'mongodb+srv://USER:PASSWORD@cluster.mongodb.net/db3?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error:', err));
//Define a Schema:

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    age: Number,
    email: String
});

const User = mongoose.model('User', userSchema);
//CRUD Operations:
//Create:

const newUser = new User({ name: 'John Doe', age: 30, email: 'john@example.com' });
newUser.save()
    .then(user => console.log('New user created:', user))
    .catch(err => console.error('Error creating user:', err));
//Read:

User.find({ age: { $gte: 25 } })
    .then(users => console.log('Users with age >= 25:', users))
    .catch(err => console.error('Error finding users:', err));
//Update:

User.updateOne({ name: 'John Doe' }, { $set: { age: 31 } })
    .then(result => console.log('Updated:', result))
    .catch(err => console.error('Error updating user:', err));
//Delete:
User.deleteOne({ name: 'John Doe' })
    .then(result => console.log('Deleted:', result))
    .catch(err => console.error('Error deleting user:', err));
//Mongoose provides a rich set of methods for interacting with MongoDB, making it easier to work with schemas and models in a more structured manner.





// In Mongoose, a model represents a collection in the MongoDB database, not individual documents.

// When you create a Mongoose model, you're essentially creating a JavaScript class that maps to a MongoDB collection. This model 
// provides an interface for interacting with the documents in that collection, allowing you to perform CRUD (Create, Read, Update, Delete) 
// operations on those documents.

// Each document in the collection corresponds to an instance of the model. So, while the model represents the overall structure and
//  behavior of the collection, individual instances of the model represent individual documents within that collection.

// In summary, a Mongoose model represents a MongoDB collection, and instances of that model represent individual documents within 
// that collection.
