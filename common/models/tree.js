/*jshint node:true */
'use strict';
var mongoose=require('mongoose');
var validate = require('mongoose-validator');

var Schema=mongoose.Schema;

//Validators
var nameValidator = validate(
  {
    validator: 'isLength',
    arguments: [3,50],
    message: 'Tree name should be between {ARGS[0]} and {ARGS[1]} characters'
  }
);


var treeSchema = new Schema({
  name: {type:String,required:true,validate: nameValidator},
  type: String
});


module.exports = mongoose.model('tree', treeSchema);
