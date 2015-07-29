/*jshint node:true */
'use strict';
var mongoose = require('mongoose');

var repository = function (modelName) {

  var self = this;

  self.Model = require('../models/' + modelName);

  self.findById = function (id, callback) {
    self.findOne({
      _id : id
    }, function(err, entity) {
      callback(err, entity);
    });
  };

  self.findOne = function (params, callback) {
    self.Model.findOne(params, function (err, entity) {
      if (!err && !entity) {
        err = true;
      }

      callback(err, entity);
    });
  };

  self.findAll = function (params, callback, lean) {
    if (!lean) {
        self.Model.find(params).exec(callback);
    } else {
        self.Model.find(params).lean().exec(callback);
    }
  };

  self.save = function (obj, callback) {
    var entity = new self.Model(obj);
    entity.save(function (err) {
      callback(err);
    });
  };

  self.update = function (id, entity, callback) {
    self.findById(id, function (err, oldEntity) {
      if (err) {
        callback(err);
      } else {

        var key;

        for(key in entity) {
          if(entity.hasOwnProperty(key)){
            oldEntity[key] = entity[key];
          }
        }
        oldEntity.save(callback);

      }
    });
  };

  self.removeById = function (id, callback) {
    self.findById(id, function (err, oldEntity) {
      if (err) {
        callback(err);
      } else {
        oldEntity.remove(callback);
      }
    });
  };

  self.getModel= function () {
    return mongoose.model(modelName);
  };

};

module.exports = repository;
