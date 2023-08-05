const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://taskconnect2:V02gss7wWBeSd47M@cluster0.szozfpl.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
  if(err) { 
    console.log("Connection err: " + err); return; 
  }

  var dbo = db.db("taskConnect");
  var coll = dbo.collection('taskCard');

  // No filter query, so we will find all documents in the collection
  coll.find({}).toArray(function(err, items) {
    if (err) {
      console.log("Error: " + err);
    } 
    else 
    {
      console.log("Items: ");
      for (i = 0; i < items.length; i++)
        console.log(i + ": " + items[i].title + " by: " + items[i].author);				
    }   
    db.close();
  });  //end find		
});  //end connect
