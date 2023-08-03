const { MongoClient, ServerApiVersion } = require('mongodb');
const http = require('http');

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
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // (REF b - See HOWTO.md):
    // Get the database and collection
    const database = client.db("taskConnect");
    const collection = database.collection("taskCard");

    // !!! "query" queries all collections (with {})
    // toArray() optional - It converts the returned query (aka cursor/pointer) into an array of documents 
    // and displays things cleaner.
    const query = await collection.find({}).toArray();

    console.log("Documents in the 'taskCard' collection:");
    console.log(query);

    return query;
  } catch (err) {
    console.log("Error:", err);
    throw err; // Rethrow the error to handle it in the server handler
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

const port = process.env.PORT || 3000;

http.createServer(async function (req, res) {
  console.log("Received request:", req.url);
  if (req.url === '/') {
    try {
      const queryResult = await run();

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write("<h2>Hello World</h2>");
      res.write("Success! This app is deployed online");

      // Displaying the query results in the HTML response
      res.write("<h3>Query Results:</h3>");
      res.write("<pre>" + JSON.stringify(queryResult, null, 2) + "</pre>");

      res.end();
    } catch (err) {
      console.log("Error in query:", err);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.write("An error occurred while fetching data from MongoDB.");
      res.end();
    }
  }
}).listen(port, () => {
  console.log(`Server running on port ${port}`);
});
