/*jshint node:true */
'use strict';
module.exports = function (server){


  var TreeService  = require('../common/services/treeService');
  var service = new TreeService();

  var config = {
    serviceBase: '/api/' + service.getModelNamePlural(false)
  };

  // GET /trees
  server.get(config.serviceBase, function(req,res){

    service.findAll(null,function(err, entities){
      if(err){
        return res.send(err);
      }

      res.json(entities);

    }, false);

  });

  // POST /trees
  server.post(config.serviceBase, function (req, res) {

    service.save(req.body, function(err){
      if(err){
        return res.send(err);
      }

      res.send({message:  service.getModelNameSingular(true) + ' Added'});

    });

  });

  //PUT /trees/id
  server.put(config.serviceBase + '/:id', function(req, res){

    var id = req.params.id;

    service.update(id, req.body, function(err){

      if(err){
          return res.send(err);
      }

      res.json({message: service.getModelNameSingular(true) + ' updated!'});

    });
  });

  //GET /trees/id
  server.get(config.serviceBase + '/:id', function(req,res){

    service.findById(req.params.id, function(err,entity){

      if(err){
        return res.send(err);
      }

      res.json(entity);

    });

  });

  //DELETE /tree/id
  server.del(config.serviceBase + '/:id', function(req,res){

    service.removeById(req.params.id, function(err){

      if(err){
        return res.send(err);
      }

      res.json({message: service.getModelNameSingular(true) + ' successfully deleted'});

    });

  });

};
