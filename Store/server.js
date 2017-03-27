var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

app.engine('html', engines.vash);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res, next) {
    res.render('index', {});
});

app.post('/add', function (req, res, next) {
    var pTitle = req.body.title;
    var pYear = req.body.year;
    var pImdb = req.body.imdb;

    var connectionString = "mongodb://localhost:27017";
    var dbName = "video";
    var collectionName = "movies";

    connectToMongo(connectionString, dbName, collectionName, function (err, collection) {

        collection.insertOne({ title: pTitle, year: pYear, imdb: pImdb })
            .then(function (item) {
                collection.find({ _id: item.insertedId }).toArray(function (err, items) {
                    var result = JSON.stringify(items);
                    res.render('movies', { result });
                });
            });
    });
});


function connectToMongo(connectionString, dbName, collectionName, callback) {
    MongoClient.connect(connectionString + "/" + dbName, function (err, db) {
        db.collection(collectionName, function (err, collection) {
            callback(err, collection);
        });
    });
}

app.listen(2000);