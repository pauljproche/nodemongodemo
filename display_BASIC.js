const { MongoClient, ServerApiVersion } = require('mongodb');
const http = require('http');

const uri = "mongodb+srv://taskconnect2:V02gss7wWBeSd47M@cluster0.szozfpl.mongodb.net/?retryWrites=true&w=majority";

async function run() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    const database = client.db("taskConnect");
    const collection = database.collection("taskCard");

    const query = await collection.find({}).toArray();
    const queryString = JSON.stringify(query, null, 2);
    return queryString;
  } catch (err) {
    console.log("Error in MongoDB query:", err);
    throw err;
  } finally {
    await client.close();
  }
}

const port = process.env.PORT || 3000;

http.createServer(async function (req, res) {
  if (req.url === '/') {
    try {
      res.write("<h2>queryResult waiting...</h2>");
      const queryResult = await run();

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write("<h2>Hello World</h2>");
      res.write("Success! This app is deployed online");

      // Displaying the query results in the HTML response
      res.write("<h3>Query Results:</h3>");
      //res.write("<pre>" + JSON.stringify(queryResult, null, 2) + "</pre>");

      res.end();
    } catch (err) {
      console.log("Error in request:", err);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.write("An error occurred while processing the request.");
      res.end();
    }
  }
}).listen(port, () => {
  console.log(`Server running on port ${port}`);
});
