const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://USER:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db('temp');
        const collection = database.collection('tempo');


        // Insert a single document using insertOne
        const insertOneResult = await collection.insertOne({multerhtml:ans });
         console.log('Insert One Result:', insertOneResult.insertedId);

        // Insert multiple documents using insertMany
        const insertManyResult = await collection.insertMany([
            { name: 'Jane Smith', age: 25 },
            { name: 'Mike Johnson', age: 40 }
        ]);
        console.log('Insert Many Result:', insertManyResult.insertedIds);

        // Insert a single document with custom _id using insertOne
        const customIdResult = await collection.insertOne({ _id: 'customId1234565', name: 'Alice', age: 35 });
        console.log('Custom ID Insert Result:',customIdResult);
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

main();
