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
    message: 'Biuilding name should be between {ARGS[0]} and {ARGS[1]} characters'
  }
);

var  buildingSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: nameValidator,
    index: {
      unique: true,
      dropDups: true
    }
  },
  visible: {
    type: Boolean,
    required: true,
    default: true
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }

});


module.exports = mongoose.model('buildingType', buildingSchema);
