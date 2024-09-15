const mongoose = require('mongoose');
const express=require('express');
const app=express();
const port=3000;
const uri='mongodb+srv://USER:PASSWORD@cluster.mongodb.net/db3?retryWrites=true&w=majority&appName=cluster9211';
//app.use(express.json());
app.use(express.urlencoded({ extended: true }));//used to parse data using post method
// server creation
app.listen(port,(err)=>{
  if(err)
  console.log('server has not started')
else
console.log(`server is listening on port${port}`)
})
// connecting mongodb
mongoose.connect(uri)
.then(()=>{
  console.log('database is connected sucessfully')
})
.catch(()=>{
  console.log('database is not connected')
})

// defining new schemma
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create a Mongoose model based on the schema
const UserDetail = mongoose.model('userdetails', userSchema);// we are creating a class named 
// creating adocument 
//UserDetail.insertOne({name:"kaku",email:"kaku@gmail.com",password:"kaku9211"})

// Read data from MongoDB
// UserDetail.findOne({ username:"huiojpk[",email:"mmk605225@gmail.com" })// we can give multiple keys with values sapated by , 
// .then(users => {
//     console.log(users);
//   })
//   .catch(err => {
//     console.error('Error reading data:', err);
//   });

//updating data in mongodb
// UserDetail.updateOne({ username: 'huiojpk[' ,email:"mmk605225@gmail.com" }, { email: 'mk605225@gmail.com' })// hare first object is object which it find second object is for updation 
//   .then((result) => {
//     console.log('Update result:', result);
//     console.log('Number of documents modified:', result.modifiedCount);
//     console.log('Number of documents matched:',result.matchedCount);
//   })
//   .catch((error) => {
//     console.error('Error updating document:', error);
//   });



// Now you can use the UserDetail model to interact with the "userDetails" collection
// For example, to create a new user document:
const createUser = async (username, email, password) => {
  try {
    const newUser = new UserDetail({//creating object of model class
      username,
      email,
      password
    });
    await newUser.save();
    console.log('User created successfully:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

// Call the createUser function with user data
app.get('/',(req,res)=>{
  res.sendFile('index.html',{root:__dirname})
})
app.post('/register', (req, res) => {
  console.log(req.body)
  const { username, email, password } = req.body;
  console.log('User registration details:');
  console.log('Username:', username);
  console.log('Email:', email);
  console.log('Password:', password);

  // Here you can implement logic to store user data in database, etc.
  createUser(username, email, password);
  res.send('User registered successfully!');
});


// 1  Comparison Operators:

// $eq: Matches values that are equal to a specified value.
// $ne: Matches values that are not equal to a specified value.
// $gt: Matches values that are greater than a specified value.
// $gte: Matches values that are greater than or equal to a specified value.
// $lt: Matches values that are less than a specified value.
// $lte: Matches values that are less than or equal to a specified value.
// $in: Matches any of the values specified in an array.
// $nin: Matches none of the values specified in an array.

// 2  Logical Operators:

// $and: Joins query clauses with a logical AND.
// $or: Joins query clauses with a logical OR.
// $not: Inverts the effect of a query expression.

// 3 Element Operators:

// $exists: Matches documents that have the specified field.
// $type: Matches documents that have a field of the specified type.

// 4 Array Operators:

// $all: Matches arrays that contain all elements specified in an array.
// $elemMatch: Matches documents that contain an array field with at least one element matching specified criteria.

// 5  Evaluation Operators:

// $regex: Matches documents that satisfy a JavaScript regular expression.

// 6 Geospatial Operators:

// $geoWithin, $geoIntersects, $near, $nearSphere: Perform geospatial queries.