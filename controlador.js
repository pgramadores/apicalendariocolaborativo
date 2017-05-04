var mongoose = require('mongoose');
var User = mongoose.model('eventos');
var config = require('./config');

exports.AgregaEvento = function(req, res) {

  try {

    let Eventos = new eventos({
      nombres: req.body.nombres,
      tituloevento: req.body.tituloevento,
      fechainicio: req.body.fechainicio,
      horainicio: req.body.horainicio,
      fechatermino: req.body.fechatermino,
      horatermino: req.body.horatermino,
      ubicacion: req.body.ubicacion,
      descripcion: req.body.descripcion,
      urlevento: req.body.urlevento
    });

    //ingreso de usuario
    var promise = Eventos.save();

    promise.then(function(doc) {
        return res.status(200).jsonp({
          ok: true
        });
      })
      .catch(function(err) {

        console.log(err);

        return res.status(500).jsonp({
          ok: false
        });


      });

  } catch (e) {
    console.log(e);
    return res.status(500).jsonp({
      ok: false
    });
  }

};
