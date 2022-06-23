const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const sql = require('mssql')
const db = require('./db/config.json')
let pool

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

// Route /Tracking
app.get('/Tracking', function (req, res) {
	if (!Datos.MensajesPrueba) return res.render('empty')
	try {
		res.render('tracking', Datos)
	} catch (err) {
		res.render('empty')
	}
})

// Route /getTracking
app.post('/getTracking',async function(req,res) {
	let telefonos = req.body.telefono.split(',').filter(el=>{return !isNaN(el) && el.length === 10})
	if(telefonos.length === 0) return res.send([])

	try {
		let results = await pool.request().query(`
		select re.Telefono,Re.Columna2 as Mensaje,WS.Fecha as FechaWS ,FechaAlta as FechaInicial, en.FechaEnvio as FechaMigrado, ed.FechaEnvio as FechaEnviado,ED.Resultado,ED2.CodigoCarrier as RespuestaProveedor,PE.Compania as Carrier,isnull(floor(datediff(second,WS.Fecha,ed.FechaEnvio)/60),floor(datediff(second,FechaAlta,ed.FechaEnvio)/60)) as [Delay]
		from smscargas.dbo.SMSRegistros RE with(nolock)
		inner join smscargas.dbo.SMSPrevioEnvio PE with(nolock) on RE.IdSMSRegistros = PE.IdSMSRegistros
		inner JOIN SMSEnvios.dbo.SMSEnvio EN with(nolock) on en.IdSMSPrevioEnvio = pe.IdSMSPrevioEnvio
		inner join SMSReportes.dbo.SMSEnvioDetalle ED with(nolock) on ed.IdSMSEnvio = en.IdSMSEnvio
		left join SMSReportes.dbo.SMSEnvioDetalle2 ED2 with(nolock) on ed.IdSMSEnvio = ed2.IdSMSEnvio
		left JOIN SMSCargas.dbo.SMSregistrosWCFDetalle WS with(nolock) on RE.IdSMSregistrosWCFDetalle = WS.IdSMSregistrosWCFDetalle
		where RE.Telefono in ('${telefonos.join('\',\'')}') 
		order by Telefono, FechaWS desc, FechaInicial desc, [Delay] desc
		`)
		// console.log(results)
		
		res.send(results.recordset)
	} catch (err) {
		// console.log(err)
		res.send([])
	}
})

// Route /updRevisadoBlaster
app.post('/updRevisadoBlaster',async function(req,res) {
	let idenviopr = req.body.idenviopr
	let revisado = req.body.revisado ? 1 : 0
	if(isNaN(idenviopr)) return res.send([])
	try {
		let results = await pool.request().query(`
		if not exists (select top 1 1 from Blaster.dbo.revisionalertas with(nolock) where idenviopr=${idenviopr})
			begin
				insert into Blaster.dbo.revisionalertas select ${idenviopr},${revisado},GETDATE()
			end
		else
			begin
				update Blaster.dbo.revisionalertas set Revisado = ${revisado},Fecha = GETDATE() where IdEnvioPr = ${idenviopr}
			end
		`)
		// console.log(results)
		res.send(results)
	} catch (err) {
		// console.log(err)
		res.send([])
	}
})

app.get('*', (req, res) => {
	res.status(300).json('No existe esta ruta... Contacta a JC')
})

// Server Listen
;(async () => {
	pool = new sql.ConnectionPool(db.prod)
	await pool.connect()
	app.listen(port, function () {
		console.log(`Server is running on port ${port}`)
	})
})()

