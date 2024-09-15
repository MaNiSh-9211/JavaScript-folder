const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Create a new MongoClient
const uri = 'mongodb+srv://USER:PASSWORD@cluster.mongodb.net/db3?retryWrites=true&w=majority';
const client = new MongoClient(uri);

// Define the main function to connect to MongoDB and perform operations
async function main() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('Connected to the MongoDB cluster');

        // Access a specific database
        const database = client.db('db3');

        // Access a specific collection within the database
        const collection = database.collection('userdetails');

        // Perform database operations (e.g., insert, find, update, delete)
        // Example: Insert a document into the collection
        await collection.insertOne({ name: 'kaku', age: 20 });
await collection.insertMany([{name:"manish",id:22,fulltime:false,registrationDate:new Date(),graduationDate:null},
    {name:"abhishek",id:21,fulltime:true,registrationDate:new Date(),graduationDate:null},{name:"vikash",id:20,fulltime:true,registrationDate:new Date(),graduationDate:null}])
        // Example: Find documents in the collection
        // const documents = await collection.find({}).toArray();
        const documents = await collection.find({ username: 'abhishek' }).toArray();
        // finding in shorted order

         console.log('Documents found:', documents);
         let documents2=await collection.find().sort({name:1})
         documents2.forEach(itr=>{
            console.log(itr)
         });
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
        console.log('Connection closed');
    }
}

// Call the main function to start the connection
main();

// Start the Express server after MongoDB connection is established
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// list of all CRUD functions in MongoDB along with their parameters:

// Create (Insert):
// insertOne(document, options, callback): Inserts a single document into the collection.
// insertMany(documents, options, callback): Inserts multiple documents into the collection.
// Read (Find):
// find(query, projection): Finds documents in the collection that match the query criteria. Returns a cursor.
// findOne(query, projection): Finds a single document in the collection that matches the query criteria.
// findById(id, projection): Finds a single document by its _id field.
// toArray(callback): Converts the cursor to an array of documents.
// Update:
// updateOne(filter, update, options, callback): Updates a single document that matches the filter with the specified update.
// updateMany(filter, update, options, callback): Updates all documents that match the filter with the specified update.
// replaceOne(filter, replacement, options, callback): Replaces a single document that matches the filter with the specified replacement.
// Delete:
// deleteOne(filter, options, callback): Deletes a single document that matches the filter.
// deleteMany(filter, options, callback): Deletes all documents that match the filter.
// These functions take various parameters such as:

// document: The document to be inserted.
// documents: An array of documents to be inserted (for insertMany).
// query: The query criteria to find documents.
// projection: Specifies which fields to include or exclude from the result.
// filter: The filter criteria to match documents for update or deletion.
// update: Specifies the modifications to apply to the document.
// replacement: Specifies the new document to replace the existing one (for replaceOne).
// options: Optional parameters such as upsert, multi, collation, etc.
// callback: A callback function to handle the result of the operation asynchronously.