var mongoose = require('mongoose');
mongoose.set('debug', true)

var Schema = mongoose.Schema;
var ChampionSchema = new Schema({

      name : String,
      image : String,
      masteries : Array

});

module.exports = mongoose.model("Champion", ChampionSchema);