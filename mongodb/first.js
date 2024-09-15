const express = require('express');
const session = require('express-session');
const mongoose = require("mongoose");
const mongodbsession=require('connect-mongodb-session')(session);//11111
//hare this module returns a anynomus function and we are passing the session object a s a parameter to the returned 
//function returned by connect mongodbsession module
const app = express();
const port = 3000;
//console.log(mongodbsession)
const dburi='mongodb+srv://USER:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dburi, {
//     useNewUrlParser: true,
//    // useCreateIndex: true,
//     useUnifiedTopology: true
})
.then(res => {
    console.log('mongodb connected');
});

const store=new mongodbsession({
    uri:dburi, 
    collection:'mysession',

});
// Add session middleware before defining routes
app.use(session({
    secret: "breaker",
    resave: false,
    saveUninitialized: false,
    store:store,
}));

// Define route handler for '/'
app.get('/', (req, res, err) => {
    req.session.isAuth = true;
    console.log(req.session);
    console.log(req.session.id);
    res.send("Is session working?");
});

app.listen(port, (err) => {
    if (err)
        console.log("An error has occurred", err);
    else
        console.log(`Server is listening on port: ${port}`);
});
//1111111
// In the specific case of the connect-mongodb-session module, passing session as an argument to the returned function likely indicates
//  that you're configuring the module to use a session object provided by another module or part of your application. This allows the 
//  connect-mongodb-session module to integrate seamlessly with your application's session management system and leverage the provided 
//  session functionality.


// Yes, exactly. The mongoose.connect() function is used to establish a connection between your Node.js application and the MongoDB 
// database. It allows your program to interact with the MongoDB database using Mongoose, an Object Data Modeling (ODM) library for
//  MongoDB and Node.js. Once the connection is established successfully, your program can perform various database operations such as 
//  querying, inserting, updating, and deleting data in the MongoDB database.

// No, a schema and a collection are not the same in the context of MongoDB and Mongoose:

// Schema: In Mongoose, a schema is a blueprint that defines the structure of documents within a collection. It specifies the fields 
// and their types, as well as any validation rules or other options. Schemas provide a way to enforce a consistent structure for documents 
// within a collection.

// Collection: In MongoDB, a collection is a group of documents stored in the database. Each document is a JSON-like object that 
// represents a record or entity. Collections are similar to tables in relational databases but are schema-less, meaning documents within a 
// collection can have different structures.

app.use(express.static('public',{index:'hdfbefwk'}))