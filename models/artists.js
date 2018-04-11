var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

exports.all = (cb) => {
  db.get().collection('artists').find().toArray(function (err, docs) {
    cb(err, docs);
  })
}

exports.findById = (id, cb) => {
  db.get().collection('artists').findOne({ _id: ObjectID(id)}, function (err, doc) {
    cb(err, doc);
  })
}

exports.create = (artist, cb) => {
  db.get().collection('artists').insert(artist, function (err, result) {
    cb(err, result);
  })
}

exports.update = (id, newData, cb) => {
  db.get().collection('artists').updateOne(
    { _id: ObjectID(id)},
    newData,
    { upsert: true },
    function (err, result) {
      cb(err, result);
    }
  )
}

exports.delete = (id, cb) => {
  db.get().collection('artists').deleteOne(
    { _id: ObjectID(id)},
    { upsert: true },
    function (err, result) {
      cb(err, result);
    }
  )
}
