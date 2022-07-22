const express = require('express')
const router = express.Router()
const db = require('../../db/db')
let pool
(async ()=>{
	pool = await db[`getConn${process.env.ENV}`]()
})()

//CargaInicial
router.get('/Alarmmanager', function (req, res) {
	
	try {

		res.render('alarmmanager', req.body.Datos)

	} catch (err) {
		res.render('empty')
	}
})

//updAlarm
router.post('/updAlarm',async function(req,res) {
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
router.post('/getAlertas',async function(req,res) {
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
router.post('/getClientes',async function(req,res) {
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
router.post('/getEtiquetas',async function(req,res) {
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
router.post('/getProveedores',async function(req,res) {
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
router.post('/getProveedoresInterno',async function(req,res) {
	
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
router.post('/DelAlarm',async function(req,res) {
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
router.post('/getAlertasbyid',async function(req,res) {
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

module.exports = router