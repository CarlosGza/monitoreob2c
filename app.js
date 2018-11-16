const express = require('express')
//const sql = require('mssql')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()


// json data
let Datos = {}


// settings
app.use('*/css',express.static('src/css'));
app.use('*/js',express.static('src/js'));
app.use('*/images',express.static('src/images'));
app.set('views', path.join(__dirname, 'src/pages'))
app.set('view engine','ejs')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Route to post data
app.post('/', function (req, res){
    Datos = req.body
    
    res.end('200')
});

// Route /Proveedores
app.get(['/','/Proveedores'], function (req, res) {
    
    try {
        
        res.render('proveedores',{
            MonitorProveedores: Datos.MonitorProveedores,
            Exitosos: Datos.Exitosos,
            NoExitosos: Datos.NoExitosos,
            Campanas: Datos.Campanas
        });
        
    }
    catch (err) {
        res.send('Sin datos cargados')

    }
});
// Route /Envios
app.get('/Envios', function (req, res) {
    /*try {
        
        res.render('envios',{
            MonitorEnvios: Datos.MonitorEnvios
        });    
    
    }
    catch (err) {
        res.send('Sin datos cargados')
    }*/
    res.end('test')
});

// Route /Programados
app.get('/Programados', function (req, res) {
    try {
        
        res.render('programados',{
            MonitorNoMigrados: Datos.MonitorNoMigrados   
        });
    
    }
    catch (err) {
        res.send('Sin datos cargados')
    }
});

// Route /Graficas
app.get('/Graficas', function (req, res) {
    try {
            res.render('graficas',{
            graficaProveedor: Datos.GraficaProveedor,
            graficaCarrier: Datos.GraficaCarrier,
            graficaCliente: Datos.GraficaCliente
        });    
    
    }
    catch (err) {
        res.send('Sin datos cargados')
    }
    
});

// Route /MensajesPrueba
app.get('/MensajesPrueba', function (req, res) {
    try {
        
        res.render('mensajesprueba',{
            MensajesPrueba: Datos.MensajesPrueba
        });    
    
    }
    catch (err) {
        res.send('Sin datos cargados')
    }
});



// Server Listen
var server = app.listen(port, function () {
    console.log(`Server is running on port ${port}`)
});