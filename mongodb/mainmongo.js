const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Update with your MongoDB URI
const dbName = 'myDatabase'; // Update with your database name
const collectionName = 'myCollection'; // Update with your collection name

const main = async () => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Create (Insert) operation
        const insertDocument = async (document) => {
            try {
                const result = await collection.insertOne(document);
                console.log('Document inserted:', result.insertedId);
            } catch (error) {
                console.error('Error inserting document:', error);
            }
        };

        // Read (Find) operation
        const findDocuments = async (query = {}) => {
            try {
                const documents = await collection.find(query).toArray();
                console.log('Documents found:', documents);
            } catch (error) {
                console.error('Error finding documents:', error);
            }
        };

        // Update operation
        const updateDocument = async (query, update) => {
            try {
                const result = await collection.updateOne(query, { $set: update });
                console.log('Document updated:', result.modifiedCount);
            } catch (error) {
                console.error('Error updating document:', error);
            }
        };

        // Delete operation
        const deleteDocument = async (query) => {
            try {
                const result = await collection.deleteOne(query);
                console.log('Document deleted:', result.deletedCount);
            } catch (error) {
                console.error('Error deleting document:', error);
            }
        };

        // Example usage
        const newDocument = { name: 'John', age: 30 };
        await insertDocument(newDocument);

        await findDocuments();
        
        const filter = { name: 'John' };
        const newData = { $set: { age: 35 } };
        await updateDocument(filter, newData);

        const deleteFilter = { age: { $gte: 40 } };
        await deleteDocument(deleteFilter);

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
};

main();
