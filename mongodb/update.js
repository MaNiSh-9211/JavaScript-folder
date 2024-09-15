const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://USER:PASSWORD@cluster.mongodb.net/db3?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db('db3');
        const collection = database.collection('test');

        // Update a single document
        const updateResult1 = await collection.updateOne({ name: 'John Doe' }, { $set: { age: 40 } });
        console.log('Update result (updateOne):', updateResult1.modifiedCount);

        // Update multiple documents
        const updateResult2 = await collection.updateMany({ age: { $gte: 20 } }, { $inc: { age: 1 } });
        console.log('Update result (updateMany):', updateResult2.modifiedCount);

        // Replace a document
       const replaceResult = await collection.replaceOne({ name: 'John Doe' }, { name: 'kkp', age: 35 });
        console.log('Replace result:', replaceResult.modifiedCount); 
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

main();
