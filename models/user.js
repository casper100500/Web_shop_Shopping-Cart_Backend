const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: false
  },
  FirstName: {
    type: String,
    required: false
  },
  MiddleName: {
    type: String,
    required: false
  },
  Sex: {
    type: String,
    required: false
  },
  Birthday: {
    type: String,
    required: false
  },
  Language: {
    type: String,
    required: false
  },
  Image: {
    type: String,
    required: false
  }
  
});

module.exports = mongoose.model('User', userSchema);