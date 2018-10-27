const express = require('express')
//const sql = require('mssql')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')



// json data
let Exitosos = {}
let NoExitosos = {}
let Campanas = {}
let monitorProveedores = {}
let MonitorNoMigrados = {}
let GraficaProveedor = []
let GraficaCarrier = []
let GraficaCliente = []
let MensajesPrueba = {}

// settings
app.use('*/css',express.static('src/css'));
app.use('*/js',express.static('src/js'));
app.use('*/images',express.static('src/images'));
app.set('views', path.join(__dirname, 'src/pages'))
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route to post data
app.post('/',function (req, res){
    let Datos = JSON.parse(req.body)
    Exitosos = Datos.Exitosos
    NoExitosos = Datos.NoExitosos
    Campanas = Datos.Campanas
    monitorProveedores = Datos.monitorProveedores
    MonitorNoMigrados = Datos.MonitorNoMigrados
    GraficaProveedor = Datos.GraficaProveedor
    GraficaCarrier = Datos.GraficaCarrier
    GraficaCliente = Datos.GraficaCliente
    MensajesPrueba = Datos.MensajesPrueba
    res.send('200')
});


// Route /Proveedores
app.get(['/','/Proveedores'], function (req, res) {
    if (Object.keys(monitorProveedores).length > 0 && Object.keys(Exitosos).length > 0 && Object.keys(NoExitosos).length > 0 && Object.keys(Campanas).length > 0){
        res.render('proveedores',{
            monitorProveedores: monitorProveedores,
            Exitosos: Exitosos.recordset[0].Exitosos,
            NoExitosos: NoExitosos.recordset[0].NoExitosos,
            Campanas: Campanas.recordset[0].Campanas
        });    
    } else {
        res.send('Sin datos cargados')
    }
});

// Route /Programados
app.get('/Programados', function (req, res) {
    if (Object.keys(MonitorNoMigrados).length > 0){
        res.render('programados',{
            MonitorNoMigrados: MonitorNoMigrados    
        });
    } else {
        res.send('Sin datos cargados')
    }
});

// Route /Graficas
app.get('/Graficas', function (req, res) {
    if (GraficaProveedor.length > 0 && GraficaCarrier.length > 0 && GraficaCliente.length > 0){
        res.render('graficas',{
            graficaProveedor: GraficaProveedor.recordset,
            graficaCarrier: GraficaCarrier.recordset,
            graficaCliente: GraficaCliente.recordset
        });    
    } else {
        res.send('Sin datos cargados')
    }
    
});

// Route /MensajesPrueba
app.get('/MensajesPrueba', function (req, res) {
    if (Object.keys(MensajesPrueba).length > 0){
        res.render('mensajesprueba',{
            MensajesPrueba: MensajesPrueba
        });    
    } else {
        res.send('Sin datos cargados')
    }
});

// Server Listen
var server = app.listen(port, function () {
    console.log(`Server is running on port ${port}`)
});