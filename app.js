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
app.use('*/images', express.static('src/images'))
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
app.get(['/', '/Proveedores'], function (req, res) {
	if (!Datos.MonitorProveedores) return res.send('No hay datos por mostrar')
	try {
		res.render('proveedores', {
			MonitorProveedores: Datos.MonitorProveedores,
			Exitosos: Datos.Exitosos,
			Proveedor: Datos.Proveedor,
			Invalidos: Datos.Invalidos,
			Fijos: Datos.Fijos,
			SinSaldo: Datos.SinSaldo,
		})
	} catch (err) {
		res.send('Sin datos cargados')
	}
})

// Route /Envios
/* app.get('/Envios', function (req, res) {
	try {
		res.render('envios', {
			MonitorEnvios: Datos.MonitorEnvios,
		})
	} catch (err) {
		res.send('Sin datos cargados')
	}
}) */

// Route /Programados
app.get('/Programados', function (req, res) {
	if (!Datos.MonitorNoMigrados) return res.send('No hay datos por mostrar')
	try {
		res.render('programados', {
			MonitorNoMigrados: Datos.MonitorNoMigrados,
		})
	} catch (err) {
		res.send('Sin datos cargados')
	}
})

// Route /Graficas
app.get('/Graficas', function (req, res) {
	if (!Datos.GraficaProveedor || !Datos.GraficaCliente || !Datos.GraficaDistProveedor) return res.send('No hay datos por mostrar')
	try {
		res.render('graficas', {
			graficaProveedor: Datos.GraficaProveedor,
			graficaCliente: Datos.GraficaCliente,
			graficaDistProveedor: Datos.GraficaDistProveedor,
		})
	} catch (err) {
		res.send('Sin datos cargados')
	}
})

// Route /MensajesPrueba
app.get('/MensajesPrueba', function (req, res) {
	if (!Datos.MensajesPrueba) return res.send('No hay datos por mostrar')
	try {
		res.render('mensajesprueba', {
			MensajesPrueba: Datos.MensajesPrueba,
		})
	} catch (err) {
		res.send('Sin datos cargados')
	}
})

app.get('*', (req, res) => {
	res.status(300).json('No existe esta ruta... Contacta a JC')
})

// Server Listen
var server = app.listen(port, function () {
	console.log(`Server is running on port ${port}`)
})
