var express = require('express');
var router = express.Router();
var _ = require('underscore');
var mongoose = require("mongoose");

var Champion = mongoose.model("Champion");


/* update Champion. */
router.put('/champions/:name', function(req, res, next){
  var update = {$set: req.body};
  Champion.update({"name" : req.params.name}, update, function(err){
      if(err) throw err;
      else res.send("success");
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Next LOL' });
});

/* GET champions page. */
router.get('/champions', function(req, res, next) {

  Champion.find({}, function(err, data){
    if(req.query.action){
        res.render('champions', { champions: data, title: 'Champions', action: req.query.action});
    }else{
        res.render('champions', { champions: data, title: 'Champions'});
    }
  })
});

/* GET add champion page. */
router.get('/champions/new', function(req, res, next) {

   res.render('addChampion', {title : "Add New Champion"});

});

/* GET champions page. */
router.get('/champions/:name', function(req, res, next) {

  Champion.findOne({"name" : req.params.name}, function(err, data){
    res.render('champion', { champion: data, title: req.params.name });
  })
});



/* Post Add Champion. */
router.post('/champions', function(req, res, next) {
    req.body.masteries = req.body.masteries.split(",");
    var champian = new Champion(req.body);
    champian.save(function(err){
      if(err) throw err;
      else  res.send("success");
   });

});
/* delete Champion. */
router.delete('/champions/:name', function(req, res, next){

  Champion.remove({"name" : req.params.name}, function(err){
      if(err) throw err;
      else res.send("success");
  });
});


module.exports = router;
