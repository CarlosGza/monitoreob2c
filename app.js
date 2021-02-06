const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')

// json data
let Datos = {}

// settings
app.use('*/css', express.static('src/css'))
app.use('*/js', express.static('src/js'))
app.use('*/images', express.static('src/img'))
app.use('*/audio', express.static('src/audio'))
app.set('views', path.join(__dirname, 'src/pages'))
app.use(favicon(path.join(__dirname, 'src', 'favicon.ico')))
app.set('view engine', 'ejs')
app.use(bodyParser.json({ limit: '500mb' })) // to support JSON-encoded bodies
app.use(
	bodyParser.urlencoded({
		// to support URL-encoded bodies
		limit: '500mb',
		extended: true,
	})
)

// Route to post data
app.post('/', function (req, res) {
	Datos = req.body
	res.end('200')
})

// Route /Proveedores
app.get(['/', '/Mensajeria'], function (req, res) {
	if (!Datos.MonitorProveedores || !Datos.MonitorNoMigrados) return res.render('empty')
	try {
		res.render('mensajeria', Datos )
	} catch (err) {
		res.render('empty')
	}
})

// Route /Usuarios
app.get('/Usuarios', function (req, res) {
	if (!Datos.Usuarios) return res.render('empty')
	try {
		res.render('usuarios', Datos)
	} catch (err) {
		res.render('empty')
	}
})

/* // Route /Mensajeria
app.get('/Mensajeria', function (req, res) {
	if (!Datos.MonitorNoMigrados) return res.render('empty')
	try {
		res.render('mensajeria', Datos)
	} catch (err) {
		res.render('empty')
	}
}) */

// Route /Blaster
app.get('/Blaster', function (req, res) {
	if (!Datos.MonitorBlaster) return res.render('empty')
	try {
		res.render('blaster', Datos)
	} catch (err) {
		res.render('empty')
	}
})

// Route /Graficas
app.get('/Graficas', function (req, res) {
	if (!Datos.GraficaProveedor || !Datos.GraficaCliente || !Datos.GraficaDistProveedor) return res.render('empty')
	try {
		res.render('graficas', Datos)
	} catch (err) {
		res.render('empty')
	}
})

// Route /MensajesPrueba
app.get('/MensajesPrueba', function (req, res) {
	if (!Datos.MensajesPrueba) return res.render('empty')
	try {
		res.render('mensajesprueba', Datos)
	} catch (err) {
		res.render('empty')
	}
})

app.get('*', (req, res) => {
	res.status(300).json('No existe esta ruta... Contacta a JC')
})



// Server Listen
var server = app.listen(port, function () {
	console.log(`Server is running on port ${port}`)
})
