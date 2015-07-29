/*jshint node:true */
'use strict';
var mongoose=require('mongoose');
var validate = require('mongoose-validator');

var Schema=mongoose.Schema;



var  buildingSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: {
      unique: true,
      dropDups: true
      }
    },
  buildingType: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
});


module.exports = mongoose.model('building', buildingSchema);
