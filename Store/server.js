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

app.post('/add_movie', function (req, res, next) {
    var pTitle = req.body.title;
    var pYear = req.body.year;
    var pImdb = req.body.imdb;

    var connectionString = "mongodb://localhost:27017";
    var dbName = "video";
    var collectionName = "movies";

    MongoClient.connect(connectionString + "/" + dbName, function (err, db) {
        db.collection(collectionName, function (err, collection) {
            var insertResult = collection.insertOne({ title: pTitle, year: pYear, imdb, pImdb }, function () {
                collection.find({ "_id": insertResult._id }).toArray(function (err, items) {
                    var result = JSON.stringify(items);
                    res.render('movies', { result });
                });
            });
        });
    });
});

app.listen(2000);