const express = require('express');
const router = express.Router();
const url = "mongodb://localhost:27017/map_project";
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbf = db.db("map_project");
  dbf.createCollection("map", function (err, res) {
    if (err) throw err;
    db.close();
  });
});


router.get('/map/:map_id', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("map_project");
    var id = {map_id: req.params.map_id}
    dbo.collection("map").findOne(id, function (err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
});

router.get('/map', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("map_project");
    dbo.collection("map").find({}).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
});

router.delete('/map/:map_id', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("map_project");
    var id = {map_id: req.params.map_id}
    dbo.collection("map").deleteOne(id, function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
})

router.put('/map/:map_id', (req, res) =>{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("map_project");
    var id = {map_id: req.params.map_id}
    var newvalues = { $set: req.body };
    dbo.collection("map").updateOne(id, newvalues, function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
})

router.post('/map', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("map_project");
    dbo.collection("map").insertOne(req.body, function (err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });



})

module.exports = router;