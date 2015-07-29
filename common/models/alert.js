/*jshint node:true */
'use strict';
var mongoose=require('mongoose');
var validate = require('mongoose-validator');

var Schema=mongoose.Schema;



var  alertSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  objectId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  level:{
    type: Number,
    min: 1,
    max: 4,
    required: true
  },
  when: {
    type: Date,
    required: true,
  },
  whenOff: {
    type: Date
  }
});


module.exports = mongoose.model('alert', alertSchema);
