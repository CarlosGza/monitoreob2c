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

/*
// update Grids every 10 seconds
setInterval( () => {
    (async function updateData() {
        try {
            let pool = await sql.connect(config)
            Exitosos = await pool.request()
                .query('SELECT count(*) as Exitosos FROM smsenvios.dbo.smsenvio with(nolock) where fechaenvio>convert(varchar(10),getdate(),112) and resultado=1')
            //console.log(qryExitosos.recordset[0].Exitosos)
            NoExitosos = await pool.request()
                .query('SELECT count(*) as NoExitosos FROM smsenvios.dbo.smsenvio with(nolock) where fechaenvio>convert(varchar(10),getdate(),112) and resultado=3')
            
            Campanas = await pool.request()
                .query('SELECT count(*) as Campanas FROM  (select distinct idenviopr from SMSCargas.dbo.SMSHorarios with(nolock) where fechainicio>convert(varchar(10),getdate(),112)) as #Campanas')
            
            monitorProveedores = await pool.request()
                .execute('sp_MonitorProveedores')

            MonitorNoMigrados = await pool.request()
                .execute('sp_MonitorNoMigrados')
            
            GraficaProveedor = await pool.request()
                .execute('sp_graficaproveedorcarrier')

            GraficaCarrier = await pool.request()
                .execute('sp_graficacarrier')
            
            GraficaCliente = await pool.request()
                .execute('sp_graficaclienteproveedor')
            
            MensajesPrueba = await pool.request()
                .execute('sp_MonitorMensajesPrueba')
            
                
        } catch (err) {
            console.log(err)
        }
        sql.close()
    })()
},10000)
*/
app.post('/',function (req, res){
    Exitosos = req.body.Exitosos
    NoExitosos = req.body.NoExitosos
    Campanas = req.body.Campanas
    monitorProveedores = req.body.monitorProveedores
    MonitorNoMigrados = req.body.MonitorNoMigrados
    GraficaProveedor = req.body.GraficaProveedor
    GraficaCarrier = req.body.GraficaCarrier
    GraficaCliente = req.body.GraficaCliente
    MensajesPrueba = req.body.MensajesPrueba
    res.end("200")
});

// Route /Envios
app.get('/Programados', function (req, res) {
    
    res.render('programados',{
        MonitorNoMigrados: MonitorNoMigrados    
    });
});

// Route /Proveedores
app.get(['/','/Proveedores'], function (req, res) {
    
    res.render('proveedores',{
        monitorProveedores: monitorProveedores,
        Exitosos: Exitosos.recordset[0].Exitosos,
        NoExitosos: NoExitosos.recordset[0].NoExitosos,
        Campanas: Campanas.recordset[0].Campanas
    });    
    
});



// Route /Graficas
app.get('/Graficas', function (req, res) {
    
    res.render('graficas',{
        graficaProveedor: GraficaProveedor.recordset,
        graficaCarrier: GraficaCarrier.recordset,
        graficaCliente: GraficaCliente.recordset
    });    
    console.log(GraficaProveedor.recordset)
});

// Route /MensajesPrueba
app.get('/MensajesPrueba', function (req, res) {
    
    res.render('mensajesprueba',{
        MensajesPrueba: MensajesPrueba,
        
    });    
    console.log(GraficaProveedor.recordset)
});

// Server Listen
var server = app.listen(port, function () {
    console.log(`Server is running on port ${port}`)
});