const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://taskconnect2:V02gss7wWBeSd47M@cluster0.szozfpl.mongodb.net/?retryWrites=true&w=majority"; 

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
}); 

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //(REF b - See HOWTO.md):
    //get the database and collection
    const database = client.db("taskConnect");
    let collection = database.collection("taskCard");

    //!!! "query" queries all collections (with {})
    // toArray() optional - It converts returned query (aka:cursor/pointer) into an array of documents 
    // and displays things cleaner.
    let query = await collection.find({}).toArray();

    console.log("Documents in the 'taskCard' collection:");
    console.log(query);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
