var mongoose = require('mongoose');
var Eventos = mongoose.model('eventos');
var config = require('./config');

exports.AgregaEvento = function(req, res) {

	try {

		let event = new Eventos({
			title: req.body.title,
			startTime: req.body.startTime,
			endTime: req.body.endTime,
			location: req.body.location,
			description: req.body.description,
			urlevent: req.body.urlevent,
			state: false
		});

		//ingreso de evento
		var promise = event.save();

		promise.then(function(doc) {
				return res.status(200).jsonp({
					creado: true
				});
			})
			.catch(function(err) {

				console.log(err);

				return res.status(500).jsonp({
					creado: false
				});
			});
	} catch (e) {
		console.log(e);
		return res.status(500).jsonp({
			creado: false
		});
	}

};

exports.ConsultaEventos = function(req, res) {
	Eventos.find(function(err, data) {
		if (err) {
			return res.send(500, err.message);
		}
		res.status(200).jsonp(data);
	});
}
