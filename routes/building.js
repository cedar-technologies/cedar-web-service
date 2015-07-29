/*jshint node:true */
'use strict';
module.exports = function (server){


  var BuildingService  = require('../common/services/buildingService');
  var service = new BuildingService();
  var GeoJSON = require('geojson');

  var config = {
    serviceBase: '/api/' + service.getModelNamePlural(false)
  };

  // GET /buildings
  server.get(config.serviceBase, function(req,res, next){

    service.findAll(null,function(err, entities){
      if(err){
        return res.send(err);
      }

      res.json(entities);

    }, false);

    return next();

  });

  //GET /buildings/id
  server.get(config.serviceBase + '/:id', function(req,res, next){

    service.findById(req.params.id, function(err,entity){

      if(err){
        return res.send(err);
      }

      res.json(entity);

    });

    return next();

  });


  //Get /buildings/geoJson
  server.get(config.serviceBase + '/geoJson/data', function(req,res, next){

    var filter = {};

    if(typeof req.params.filter !== 'undefined'){
      filter = JSON.parse(decodeURIComponent(req.params.filter));
    }

    service.findAll(filter,function(err, entities){
      if(err){
        return res.send(err);
      }

      GeoJSON.parse(entities, {Point: ['lat', 'lng']}, function(geojson){

          for(var i = 0, len = geojson.features.length; i < len; i++){
            geojson.features[i].id = i;
          }

          res.json(geojson);
      });



    }, true);

    return next();

  });


  //Get /buildings/geoJson
  // server.get(config.serviceBase + '/geoJson/:query', function(req,res, next){
  //
  //   var query = JSON.parse(decodeURIComponent(req.params.query));
  //
  //   service.findAll(query,function(err, entities){
  //     if(err){
  //       return res.send(err);
  //     }
  //
  //     GeoJSON.parse(entities, {Point: ['lat', 'lng']}, function(geojson){
  //
  //         for(var i = 0, len = geojson.features.length; i < len; i++){
  //           geojson.features[i].id = i;
  //         }
  //
  //         res.json(geojson);
  //     });
  //
  //
  //
  //   }, true);
  //
  //   return next();
  //
  // });





  // POST /buildings
  server.post(config.serviceBase, function (req, res) {

    service.save(req.body, function(err){
      if(err){
        return res.send(err);
      }

      res.send({message:  service.getModelNameSingular(true) + ' Added'});

    });

  });

  //PUT /buildings/id
  server.put(config.serviceBase + '/:id', function(req, res){

    var id = req.params.id;

    service.update(id, req.body, function(err){

      if(err){
          return res.send(err);
      }

      res.json({message: service.getModelNameSingular(true) + ' updated!'});

    });
  });



  //DELETE /building/id
  server.del(config.serviceBase + '/:id', function(req,res){

    service.removeById(req.params.id, function(err){

      if(err){
        return res.send(err);
      }

      res.json({message: service.getModelNameSingular(true) + ' successfully deleted'});

    });

  });





};
