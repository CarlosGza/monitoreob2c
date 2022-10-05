const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const sql = require('mssql')
const db = require('./db/config.json')
const cors = require('cors')
require('dotenv').config()
const port = process.env[`PORT_${process.env.ENV}`]
let pool
// json data
let Datos = {}

console.log(process.env.ENV)
console.log(port)

//import routes
const rutasMensajeria = require('./api/routes/mensajeria')
const rutasUsuarios = require('./api/routes/usuarios')
const rutasBlaster = require('./api/routes/blaster')
const rutasGraficas = require('./api/routes/graficas')
const rutasMensajesPrueba = require('./api/routes/mensajesprueba')
const rutasTracking = require('./api/routes/tracking')
const rutasAlarmManager = require('./api/routes/alarmmanager')
const rutasEmailing = require('./api/routes/emailing')

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
app.use(cors({origin: '*'}))

//middleware para Datos
const sourceData = (req, res, next) => {
	if(req.method == 'GET') req.body.Datos = Datos
  next()
}
app.use(sourceData)

// Route to post data
app.post('/', function (req, res) {
	Datos = {...req.body}
	res.end('200')
})

// Routes
app.use(rutasMensajeria)
app.use(rutasUsuarios)
app.use(rutasBlaster)
app.use(rutasGraficas)
app.use(rutasMensajesPrueba)
app.use(rutasTracking)
app.use(rutasAlarmManager)
app.use(rutasEmailing)


app.get('*', (req, res) => {
	res.render('notfound')
})

// Server Listen
;(async () => {
	/* pool = new sql.ConnectionPool(db.qa)
	await pool.connect() */
	app.listen(port, function () {
		console.log(`Server is running on port ${port}`)
	})
})()

