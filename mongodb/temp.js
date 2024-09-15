const uri='6976768667'
const client=new MongoClient(uri);
async function main(){
    try{
await client.connect();
console.log('client connected sucessfully')
const database=client.db('db3')
const collection3=database.collection('')
    }
    catch(err){
        console.log('error has occured')
    }
    finally{
await client.close();
    }
}
main();