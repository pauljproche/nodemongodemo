const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://dbuser120:dbuser120@cluster0.auqbuxe.mongodb.net/";

  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if(err) { 
		console.log("Connection err: " + err); return; 
	}
  
    var dbo = db.db("library");
	var coll = dbo.collection('books');
	
	//coll.find({},{projection: {"title":1, "author":1, "_id":0}});
	theQuery = {author:"Bob Smith"}
	coll.find(theQuery).toArray(function(err, items) {
	  if (err) {
		console.log("Error: " + err);
	  } 
	  else 
	  {
		console.log("Items: ");
		for (i=0; i<items.length; i++)
			console.log(i + ": " + items[i].title + " by: " + items[i].author);				
	  }   
	  db.close();
	});  //end find		
});  //end connect
