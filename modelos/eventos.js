
var mongoose = require('mongoose'),
  Schema   = mongoose.Schema;

var Eventos = new Schema({
  title       : { type : String,  required : true },
  startTime   : { type : Date,    required : true },
  endTime     : { type : Date,    required : true },
  location    : { type : String,  required : true },
  description : { type : String,  required : true },
  urlevent    : { type : String,  required : true },
  state       : { type : Boolean, required : true }
});

module.exports = mongoose.model('eventos', Eventos);
