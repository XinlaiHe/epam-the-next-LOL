var express = require('express');
var router = express.Router();
var _ = require('underscore');
var mongoose = require("mongoose");

var Champion = mongoose.model("Champion");


/* update Champion. */
router.put('/champions/:name', function(req, res, next){

  if(req.isAuthenticated()){
      var update = {$set: req.body};
      Champion.update({"name" : req.params.name}, update, function(err){
      if(err) throw err;
      else res.send("success");
      });
  }else{
      res.send("user not login");
  }

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Next LOL' , user: req.user });
});

/* GET champions page. */
router.get('/champions', function(req, res, next) {

  Champion.find({}, function(err, data){
    if(req.query.action){
        res.render('champions', { champions: data, title: 'Champions', action: req.query.action, user: req.user });
    }else{
        res.render('champions', { champions: data, title: 'Champions', action: req.query.action, user: req.user });
    }
  })
});

/* GET add champion page. */
router.get('/champions/new', function(req, res, next) {

   if(req.isAuthenticated()){
       res.render('addChampion', {title : "Add New Champion", user: req.user });
   }else{
      res.redirect('/users/login');
   }


});

/* GET champions page. */
router.get('/champions/:name', function(req, res, next) {

  Champion.findOne({"name" : req.params.name}, function(err, data){
    res.render('champion', { champion: data, title: req.params.name, user: req.user  });
  })
});



/* Post Add Champion. */
router.post('/champions', function(req, res, next) {
  if(req.isAuthenticated()){
      req.body.masteries = req.body.masteries.split(",");
      var champian = new Champion(req.body);
      champian.save(function(err){
        if(err) throw err;
        else  res.send("success");
   });
  }else{
       res.send("user not login");
  }


});
/* delete Champion. */
router.delete('/champions/:name', function(req, res, next){
  if(req.isAuthenticated()){
    Champion.remove({"name" : req.params.name}, function(err){
      if(err) throw err;
      else res.send("success");
    });
  }else{
    res.send('user not login');
  }

});


module.exports = router;
