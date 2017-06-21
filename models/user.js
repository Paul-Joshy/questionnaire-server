var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password:{
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true,
      unique: true
    },
    hasVerified:{
      type: Boolean,
      required: true,
      default: false
    },
    admin:{
      required: true,
      type: Boolean,
      default: false
    }
});

module.exports = mongoose.model('user', userSchema);
