const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://USER:PASSWORD@cluster.mongodb.net/registration?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db('registration');
        const collection = database.collection('registered_users');
        //const singleDocument=await collection.findOne({email:'dd@gmail.com', password:await collection.findOne({ email : 'dd@gmail.com'  }).password})
                 //console.log('Single document:', singleDocument);
                 const { password } = await collection.findOne(
                    { email: 'dd@gmail.com' },
                    { projection: { _id: 0, password: 1 } }
                  ) || { password: null };
                  
                  console.log(password);
        // Find all documents
        // const allDocuments = await collection.find({}).toArray();
        // console.log('All documents:', allDocuments);

        // Find a single document
        // const singleDocument = await collection.findOne({ "": { $exists: true } });
        // console.log('Single document:', singleDocument);

        // Find documents matching a query and sort them
        // const sortedDocuments = await collection.find({ age: { $gte: 30 } }).sort({ age: 1 }).toArray();
        // console.log('Sorted documents:', sortedDocuments);

        // // Find documents and limit the results
        // const limitedDocuments = await collection.find({}).limit(2).toArray();
        // console.log('Limited documents:', limitedDocuments);z
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

main();
