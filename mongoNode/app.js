
var MongoClient = require('mongodb').MongoClient;

var connectionString = "mongodb://localhost:27017";
var dbName = "interactive_poll";
var collectionName = "poll_questions";

MongoClient.connect(connectionString + "/" + dbName, function (err, db) {
    db.collection(collectionName, function (err, collection) {
        collection.find().toArray(function (err, items) {
            var result = JSON.stringify(items);
            console.log(result);
        });
    });
});