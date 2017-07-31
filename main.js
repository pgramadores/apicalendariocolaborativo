// Importación de nuestro modelos
require('./modelos/eventos');

// Inyección de dependencias
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var helmet = require('helmet');
var moment = require('moment');
var hsts = require('hsts');
var fs = require('fs');
var https = require('https');
var ctrl = require('./controlador');
var config = require('./config');

var app = express();

// Cargamos certificados de seguridad SSL/TSL
var options = {
	key: fs.readFileSync(config.certificados.private),
	cert: fs.readFileSync(config.certificados.certificado),
  passphrase: config.contrasena
};

// Configuramos Express
app.use(helmet());

// Seguridad para el uso exclusivo de protocolo https para la llamada a la api
app.use(hsts({
	maxAge: 10886400,
	includeSubDomains: true,
	preload: true
}))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cors());
app.set('port', config.puerto);
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Methods', 'POST');
	res.setHeader('Content-Type', 'application/json');
	next();
});

// Iniciamos las rutas de nuestro servidor/API
var router = express.Router();

// Ruta de bienvenida
router.get('/', function(req, res) {
	res.send({
		'Mensaje': 'Bienvenid@s a la API de Calendarios Colaborativos de Pro-Gramadores'
	});
});

// Rutas de registro
router.post('/eventos/agregar', ctrl.AgregaEvento);

// Ruta de consulta de eventos disponibles
router.get('/eventos/consultar/', ctrl.ConsultaEventos);

// Ruta de cancelación de suscripción
//router.post('/eventos/cancelar/:id', ctrl.CancelaEvento);

// Ruta de aceptación de suscripción
//router.get('/eventos/consultar/:id', ctrl.ConsultaEvento);

app.use(router);

// Iniciamos el servidor y la base de datos
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/${config.nombreDB}`, function(err) {
	if (!err) {
		https.createServer(options, app).listen(app.get('port'), function() {
			console.log('Express corriendo en ' + config.domain + ':' + config.puerto);
		});
	} else {
		console.log(err.message);
	}
});
