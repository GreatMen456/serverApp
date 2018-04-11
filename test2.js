var express = require ('express');
var bodyParser = require ('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db = require('./db');
var artistsController = require('./controllers/artists');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var artists = [
  {
    id: 1,
    name: 'Metallica'
  },
  {
    id: 2,
    name: 'Iron Maiden'
  },
  {
    id: 3,
    name: 'Deep Purple'
  }
];

app.get('/', function (req, res) {
  res.send('hello api');
})

app.get('/artists', function (req, res) {
  db.get().collection('artists').find().toArray(function (err, docs) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  })
  //res.send(artists);
})

app.get('/artists/:id', function (req, res) {
  db.get().collection('artists').findOne({ _id: ObjectID(req.params.id)}, function (err, doc) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  })
})

app.post('/artists', function (req, res) {
  var artist = {
    name: req.body.name
  };
  db.get().collection('artists').insert(artist, function (err, result) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(artist);
  })
//  res.send(artist);
})

app.put('/artists/:id', function (req, res) {
  db.get().collection('artists').updateOne(
    { _id: ObjectID(req.params.id)},
    {$set: {name: req.body.name}},
    { upsert: true },
    function (err, result) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    }
  )
})

app.delete('/artists/:id', function (req, res) {
  db.get().collection('artists').deleteOne(
    { _id: ObjectID(req.params.id)},
    { upsert: true },
    function (err, result) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    }
  )

  // artists = artists.filter(function (artist) {
  //   return artist.id !== Number(req.params.id);
  // })
  // res.sendStatus(200);
})

//app.listen(3012, function () {
  //console.log('API app started');
//})

db.connect('mongodb://localhost:27017', function (err) {
  if (err) {
    return console.log(err);;
  }
  app.listen(3012, function () {
    console.log('API app started');
  })
})
