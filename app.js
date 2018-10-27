const express = require('express')
//const sql = require('mssql')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')



// json data
let Datos = {}


// settings
app.use('*/css',express.static('src/css'));
app.use('*/js',express.static('src/js'));
app.use('*/images',express.static('src/images'));
app.set('views', path.join(__dirname, 'src/pages'))
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route to post data
app.post('/api',function (req, res){
    Datos = JSON.parse(req.body)
    res.send('200')
});


// Route /Proveedores
app.get(['/','/Proveedores'], function (req, res) {
    if (Object.keys(monitorProveedores).length > 0 && Object.keys(Exitosos).length > 0 && Object.keys(NoExitosos).length > 0 && Object.keys(Campanas).length > 0){
        res.render('proveedores',{
            monitorProveedores: Datos.monitorProveedores,
            Exitosos: Datos.Exitosos.recordset[0].Exitosos,
            NoExitosos: Datos.NoExitosos.recordset[0].NoExitosos,
            Campanas: Datos.Campanas.recordset[0].Campanas
        });    
    } else {
        res.send('Sin datos cargados')
    }
});

// Route /Programados
app.get('/Programados', function (req, res) {
    if (Object.keys(MonitorNoMigrados).length > 0){
        res.render('programados',{
            MonitorNoMigrados: Datos.MonitorNoMigrados    
        });
    } else {
        res.send('Sin datos cargados')
    }
});

// Route /Graficas
app.get('/Graficas', function (req, res) {
    if (GraficaProveedor.length > 0 && GraficaCarrier.length > 0 && GraficaCliente.length > 0){
        res.render('graficas',{
            graficaProveedor: Datos.GraficaProveedor.recordset,
            graficaCarrier: Datos.GraficaCarrier.recordset,
            graficaCliente: Datos.GraficaCliente.recordset
        });    
    } else {
        res.send('Sin datos cargados')
    }
    
});

// Route /MensajesPrueba
app.get('/MensajesPrueba', function (req, res) {
    if (Object.keys(MensajesPrueba).length > 0){
        res.render('mensajesprueba',{
            MensajesPrueba: Datos.MensajesPrueba
        });    
    } else {
        res.send('Sin datos cargados')
    }
});

// Server Listen
var server = app.listen(port, function () {
    console.log(`Server is running on port ${port}`)
});