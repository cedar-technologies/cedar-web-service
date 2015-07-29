/*jshint node:true */
'use strict';
module.exports = function (server){


  var BuildingTypeService  = require('../common/services/buildingTypeService');
  var service = new BuildingTypeService();

  var config = {
    serviceBase: '/api/' + service.getModelNamePlural(false)
  };

  // GET /buildingTypes
  server.get(config.serviceBase, function(req,res, next){

    //check if filter exists
    var filter = {};

    if(typeof req.params.filter !== 'undefined'){
      filter = JSON.parse(decodeURIComponent(req.params.filter));
    }


    service.findAll(filter,function(err, entities){
      if(err){
        return res.send(err);
      }

      res.json(entities);

    }, false);

    next();

  });

  //GET /buildingTypes/id
  server.get(config.serviceBase + '/:id', function(req,res,next){

    service.findById(req.params.id, function(err,entity){

      if(err){
        return res.send(err);
      }

      res.json(entity);

    });

    next();

  });

  // GET /buildingTypes/query
  server.get(config.serviceBase + '/:query', function(req,res, next){

    var query = JSON.parse(decodeURIComponent(req.params.query));

    service.findAll(query,function(err, entities){
      if(err){
        return res.send(err);
      }

      res.json(entities);

    }, false);

    next();

  });

  // POST /buildingTypes
  server.post(config.serviceBase, function (req, res) {

    service.save(req.body, function(err){
      if(err){
        return res.send(err);
      }

      res.send({message:  service.getModelNameSingular(true) + ' Added'});

    });

  });

  //PUT /buildingTypes/id
  server.put(config.serviceBase + '/:id', function(req, res){

    var id = req.params.id;

    service.update(id, req.body, function(err){

      if(err){
          return res.send(err);
      }

      res.json({message: service.getModelNameSingular(true) + ' updated!'});

    });
  });



  //DELETE /buildingTypes/id
  server.del(config.serviceBase + '/:id', function(req,res){

    service.removeById(req.params.id, function(err){

      if(err){
        return res.send(err);
      }

      res.json({message: service.getModelNameSingular(true) + ' successfully deleted'});

    });

  });

};
