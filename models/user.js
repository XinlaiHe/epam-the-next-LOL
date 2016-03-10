var mongoose = require('mongoose');
mongoose.set('debug', true)

var Schema = mongoose.Schema;
var UserSchema = new Schema({

      username : {
        type: String,
        unique: true
      },
      password : String,
      email : String,

});

UserSchema.method('validPassword', function(password, callback) {

   if (password == this.password) {
     return true;
   } else {
     return false;
   }
});

module.exports = mongoose.model("User", UserSchema);