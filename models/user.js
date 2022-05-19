var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  favoriteBook:{
    type: String,
    required: true,
    trim: true
  },
  password:{
    type: String,
    required: true
  }
});

var User = mongoose.model('User', userSchema);
module.exports = User;
