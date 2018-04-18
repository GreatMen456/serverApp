const Artists = require('../models/artists');

exports.all = (req, res) => {
  Artists.all(req.query.q, function (err, docs) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  })
}

exports.findById = (req, res) => {
  Artists.findById(req.params.id, function (err,doc) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  })
}

exports.create = (req, res) => {
  const artist = {
    name: req.body.name,
    avatar: req.body.avatar,
    about: req.body.about,
    age: req.body.age,
    nationality: req.body.nationality,
    styleOfMusic: req.body.styleOfMusic,
    hits: req.body.hits
  };
  Artists.create(artist, function (err, result) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.status(201);
    res.send(artist);
  })
}

exports.update = (req, res) => {
  const new_list = {
    name: req.body.name,
    avatar: req.body.avatar,
    about: req.body.about,
    age: req.body.age,
    nationality: req.body.nationality,
    styleOfMusic: req.body.styleOfMusic,
    hits: req.body.hits
  }
  Artists.update(req.params.id, {$set:new_list}, function (err, result) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(200);
  })
}

exports.delete = (req, res) => {
  Artists.delete(req.params.id, function (err, result) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  })
}
