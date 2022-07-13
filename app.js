const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 5000
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


///////////////
///// Aqui empieza los cambios de ABJ /////////////////////////

//CargaInicial
app.get('/Alarmmanager', function (req, res) {
	
	try {

		res.render('alarmmanager')

	} catch (err) {
		res.render('empty')
	}
})

//updAlarm
app.post('/updAlarm',async function(req,res) {
	let Id = req.body.IdAlerta
	let Seccion = req.body.Seccion
	let Nivel = req.body.Nivel
	let ViaEnvio = req.body.ViaEnvio
	let PError = req.body.PError
	let PTiempo = req.body.PTiempo
	let Carriers = req.body.Carriers
	let Mensaje = req.body.Mensaje
	let Destinatarios = req.body.Destinatarios
    let CompaniasProv = req.body.CompaniasProv
	let Prov = req.body.Prov
	let Etiquetas = req.body.Etiquetas
	let ClientesVIP = req.body.ClientesVIP

    console.log( "Los datos recibidos son: " + Id + ", " + Seccion + ", " +Nivel + ", " +ViaEnvio + ", " +PError + "," +PTiempo + "," +Carriers + "," +Mensaje + ", " +Destinatarios + ", " +CompaniasProv+ ", " +Prov+ ", " +Etiquetas+","+ClientesVIP )
	
	if(isNaN(Id)) return res.send([])
	try {
		let results = await pool.request().query(`
	
			if not exists (select top 1 1 from [SMSCargas].[dbo].[AlertasOperativo] with(nolock) where IdAlerta=${Id})
				begin
                        

					if not exists (select top 1 1 from [SMSCargas].[dbo].[AlertasOperativo] with(nolock) where Seccion = ${Seccion} and Nivel = ${Nivel})
					begin

					   insert into [SMSCargas].[dbo].[AlertasOperativo] select ${Seccion},${Nivel},${ViaEnvio},${PError},${PTiempo},'${Carriers}','${Mensaje}','${Destinatarios}','${CompaniasProv}','${Prov}','${Etiquetas}','${ClientesVIP}',GETDATE()
					   select '1' Resultado				   
					   
					end
					else
						begin
							select '0' Resultado
					end

				end
			else
				begin
				
				
						if (select Nivel from [SMSCargas].[dbo].[AlertasOperativo] with(nolock) where Seccion = ${Seccion} and IdAlerta = ${Id}) = ${Nivel}
						begin
								update [SMSCargas].[dbo].[AlertasOperativo]  set Nivel = ${Nivel}, ViaEnvio = ${ViaEnvio}, PError = ${PError}, PeriodoT = ${PTiempo}, Carriers = '${Carriers}', Mensaje = '${Mensaje}', Destinatarios =  '${Destinatarios}',ProvCompania =  '${CompaniasProv}',Proveedores =  '${Prov}',Etiquetas =  '${Etiquetas}',ClientesVIP =  '${ClientesVIP}', FechaCreacion = GETDATE() where IdAlerta=${Id}
								select '1' Resultado							

						end
						else
						begin
							if not exists (select top 1 1 from [SMSCargas].[dbo].[AlertasOperativo] with(nolock) where Seccion = ${Seccion} and Nivel = ${Nivel})
										begin
										
										update [SMSCargas].[dbo].[AlertasOperativo]  set Nivel = ${Nivel}, ViaEnvio = ${ViaEnvio}, PError = ${PError}, PeriodoT = ${PTiempo}, Carriers = '${Carriers}', Mensaje = '${Mensaje}', Destinatarios =  '${Destinatarios}',ProvCompania =  '${CompaniasProv}',Proveedores =  '${Prov}',Etiquetas =  '${Etiquetas}',ClientesVIP =  '${ClientesVIP}', FechaCreacion = GETDATE() where IdAlerta=${Id}
										select '1' Resultado

										end
								else
									begin
										select '0' Resultado
								end

						end
				
				end

		
		
		`)
		
		console.log("Estos son los resultados del updAlarm: " + results.recordset)
		res.send(results.recordset)

	} catch (err) {
		console.log("Este es el error: " + err)
		res.send(err)
	}
})

// getAlertas
app.post('/getAlertas',async function(req,res) {
	let Seccion = req.body.Seccion
    console.log("Esto esto es lo que trae Seccion: " + req.body.Seccion)

	if(Seccion.length === 0) return res.send([])

	try {
		let results = await pool.request().query(`
		SELECT TOP (1000) [IdAlerta]
      ,[Seccion]
      ,[Nivel]
      ,[ViaEnvio]
      ,[PError]
      ,[PeriodoT]
      ,[Carriers]
      ,[Mensaje]
      ,[Destinatarios]
      ,[FechaCreacion]
  FROM [SMSCargas].[dbo].[AlertasOperativo]
  where Seccion = ${Seccion}
  		order by Nivel desc
		`)
		console.log("Estos son los resultados del getAlertas: " + results)
		
		res.send(results.recordset)
	} catch (err) {
		 console.log(err)
		res.send([])
	}
})

// getClientes
app.post('/getClientes',async function(req,res) {
	let Cli = req.body.Clientes
    console.log("Esto esto es lo que trae de Clientes: " + Cli)

	try {
		let results = await pool.request().query(`

		SELECT [IdCliente] Valor,[Cliente] Texto
        FROM [SMSCargas].[dbo].[SMSClientes]
        WHERE IsActivo = 1

		`)
		console.log("Estos son los resultados del getClientes: " + results.recordset)
		
		res.send(results.recordset)
	} catch (err) {
		 console.log(err)
		res.send([])
	}
})

// getEtiquetas
app.post('/getEtiquetas',async function(req,res) {
	let Prov = req.body.Prov
    console.log("Esto esto es lo que trae CompaniasProv: " + Prov)

	try {
		let results = await pool.request().query(`

		Select 0 Valor, '-Todas-' Texto
		UNION
		SELECT  et.IdSIM Valor, convert(varchar,et.Etiqueta) + ' - ' + AliasProveedor Texto
		FROM SMSCargas.dbo.SMSSIM et
		INNER JOIN SMSCargas.dbo.ProveedoresRCB RCB WITH(NOLOCK) ON RCB.IdProveedorRCB=et.IdSMSGrupo
		where et.activo = 1 and IdSMSGrupo in (${Prov})


		`)
		console.log("Estos son los resultados del getEtiquetas: " + results.recordset)
		
		res.send(results.recordset)
	} catch (err) {
		 console.log(err)
		res.send([])
	}
})

// getProveedores
app.post('/getProveedores',async function(req,res) {
	let CompaniasProv = req.body.CompaniasProv
    console.log("Esto esto es lo que trae CompaniasProv: " + CompaniasProv)

	try {
		console.log(`
		SELECT IdProveedorRCB Valor,AliasProveedor Texto from SMSCargas.dbo.ProveedoresRCB
		WHERE Activo = 1 and USSD = 0 and RCS = 0 and NombreInternoProveedor in (${CompaniasProv})
		ORDER BY NombreInternoProveedor 
		`)
		
		let results = await pool.request().query(`

		SELECT IdProveedorRCB Valor,AliasProveedor Texto from SMSCargas.dbo.ProveedoresRCB
				WHERE Activo = 1 and USSD = 0 and RCS = 0 and NombreInternoProveedor in (${CompaniasProv})
				ORDER BY NombreInternoProveedor 

		`)
		console.log("Estos son los resultados del getProveedores: " + results.recordset)
		
		res.send(results.recordset)
	} catch (err) {
		 console.log(err)
		res.send([])
	}
})

// getProveedoresInterno
app.post('/getProveedoresInterno',async function(req,res) {
	
	try {
		let results = await pool.request().query(`

		select distinct NombreInternoProveedor Valor, NombreInternoProveedor Texto from SMSCargas.dbo.ProveedoresRCB
				where Activo = 1 and USSD = 0 and RCS = 0
				ORDER BY NombreInternoProveedor

		`)
		console.log("Estos son los resultados del getProveedoresInterno: " + results.recordset)
		
		res.send(results.recordset)
	} catch (err) {
		 console.log(err)
		res.send([])
	}
})

// DelAlarm
app.post('/DelAlarm',async function(req,res) {
	console.log("Entra a la eliminacion")
	let id = req.body.IdAlerta
    console.log("Esto esto es lo que trae IdAlerta para borrar un registro: " + id)

	try {
		let results = await pool.request().query(`
		DELETE FROM [SMSCargas].[dbo].[AlertasOperativo] WHERE IdAlerta = ${id} `)
		console.log(results)
		
		res.send(results.recordset)
	} catch (err) {
		 console.log(err)
		res.send([])
	}
})

// getAlertasbyid
app.post('/getAlertasbyid',async function(req,res) {
	let IdAlerta = req.body.IdAlerta
    console.log("Esto es lo que trae el IdAlerta: " + req.body.IdAlerta)
	

	if(IdAlerta.length === 0) return res.send([])

	try {
		let results = await pool.request().query(`
		SELECT TOP (1) [IdAlerta]
      ,[Seccion]
      ,[Nivel]
      ,[ViaEnvio]
      ,[PError]
      ,[PeriodoT]
      ,[Carriers]
      ,[Mensaje]
      ,[Destinatarios]
	  ,[ProvCompania]
	  ,[Proveedores]
	  ,[Etiquetas]
	  ,[ClientesVIP]
      ,[FechaCreacion]
      FROM [SMSCargas].[dbo].[AlertasOperativo]
      where IdAlerta = ${IdAlerta} 
  		order by Nivel desc
		`)
		console.log("Los resultados del getAlertasbyid son: " + results)
		
		res.send(results.recordset)
	} catch (err) {
		 console.log(err)
		res.send([])
	}
})


////////////////////////////////FIN CAMBIOS////////////////////////////////
////////////////




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

