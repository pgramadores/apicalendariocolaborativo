
var mongoose = require('mongoose'),
  Schema   = mongoose.Schema;

var Eventos = new Schema({
  tituloevento: { type : String,  required: true },
  fechainicio : { type : Date,    required : true },
  horainicio  : { type : String,  required : true },
  fechatermino: { type : Date,    required : true },
  horatermino : { type : String,  required : true },
  ubicacion   : { type : String,  required : true },
  descripcion : { type : String,  required : true },
  urlevento   : { type : String,  required : true }
});

module.exports = mongoose.model('eventos', Eventos);
