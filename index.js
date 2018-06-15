const express = require ('express');
const bodyParser = require ('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const db = require('./db');
const artistsController = require('./controllers/artists');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));

app.get('/artists', artistsController.all);

app.get('/artists/:id', artistsController.findById);

app.post('/artists', artistsController.create);

app.put('/artists/:id', artistsController.update);

app.delete('/artists/:id', artistsController.delete);

//app.listen(3012, function () {
  //console.log('API app started');
//})

db.connect('mongodb://localhost:27017', function (err) {
  if (err) {
    return console.log(err);
  }
  app.listen(process.env.PORT || 3012), function () {
    console.log('API app started http://localhost:3012');
  })
})
