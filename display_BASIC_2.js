const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://taskconnect2:V02gss7wWBeSd47M@cluster0.szozfpl.mongodb.net/?retryWrites=true&w=majority";

async function run() {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  
  try {
    await client.connect();
    const dbo = client.db("taskConnect");
    const coll = dbo.collection('taskCard');

    // No filter query, so we will find all documents in the collection
    const items = await coll.find({}).toArray();

    console.log("Items: ");
    for (let i = 0; i < items.length; i++) {
      console.log(i + ": " + items[i].title + " by: " + items[i].author);				
    }
  } catch (err) {
    console.log("Error: " + err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir); // Running the async function and handling any uncaught rejections
