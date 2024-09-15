const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://USER:PASSWORD@cluster.mongodb.net/db3?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db('db3');
        const collection = database.collection('test');

        // Delete a single document
        const deleteSingle = await collection.deleteOne({ name: 'John Doe' });
        console.log('Deleted single document:', deleteSingle.deletedCount);

        // Delete multiple documents
        const deleteMultiple = await collection.deleteMany({ age: { $gte: 30 } });
        console.log('Deleted multiple documents:', deleteMultiple.deletedCount);

        // Find and delete a single document
        
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

main();
