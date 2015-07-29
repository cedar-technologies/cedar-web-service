/*jshint node:true */
'use strict';

var config = {
  model: 'tree',
  models: 'trees'
};

var _repository = require("../infrastructure/repository.js");
var repository = new _repository(config.model);
var capitalize = require("underscore.string/capitalize");

var service = function(){

  var self = this;

  self.findById = function (id, callback) {
    repository.findById(id, callback);
  };

  self.findOne = function (params, callback) {
    repository.findOne(params, callback);
  };

  self.findAll = function (params, callback, lean) {
    repository.findAll(params, callback, lean);
  };

  self.save = function (obj, callback) {
    repository.save(obj, callback);
  };

  self.update = function (id, entity, callback) {
    repository.update(id, entity, callback);
  };

  self.removeById = function (id, callback) {
    repository.removeById(id, callback);
  };

  self.getModel= function () {
    return repository.getModel();
  };

  self.getModelNameSingular = function(capital) {
    if(capital){
      return capitalize(config.model);
    }
    return config.model;
  };

  self.getModelNamePlural = function(capital) {
    if(capital){
      return capitalize(config.models);
    }
    return config.models;
  };

};

module.exports = service;
