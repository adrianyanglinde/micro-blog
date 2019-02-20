var mongodb = require('../models/db');

function User(user) {
  this.name = user.name;
  this.password = user.password;
};

module.exports = User;

User.prototype.save = function save(callback) {

  var user = {
    name: this.name,
    password: this.password,
  };
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('users', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      console.log(user);
      collection.ensureIndex('name', {unique: true});
      collection.insert(user, {safe: true}, function(err, user) {
        mongodb.close();
        callback(err, user);
      });
    });
  });
};


User.get = function get(username, callback) {
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    // 读取 users 集合
    db.collection('users', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      // 查找 name 属性为 username 的文档
      collection.findOne({name: username}, function(err, doc) {
        mongodb.close();
        if (doc) {
          // 封装文档为 User 对象
          var user = new User(doc);
          callback(err, user);
        } else {
          callback(err, null);
        }
      });
    });
  });
};

