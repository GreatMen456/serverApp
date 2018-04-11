var MongoClient = require('mongodb').MongoClient;

var state = {
  db: null
};

exports.connect = (url, done) => {
  if (state.db) {
    return done();
  }
  MongoClient.connect(url, function (err, client) {
    if (err) {
      return done(err);
    }
    state.db = client.db('myapi');
    done();
  })
}

exports.get = () => {
  return state.db;
}
