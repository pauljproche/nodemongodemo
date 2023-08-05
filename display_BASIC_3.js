const MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://taskconnect2:V02gss7wWBeSd47M@cluster0.szozfpl.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
  if (err) {
    console.log("Connection Error: " + err);
  } else {
    console.log("Connected successfully!");
    db.close();
  }
});
