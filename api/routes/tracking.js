const express = require('express')
const router = express.Router()
const db = require('../../db/db')
let pool
(async ()=>{
	pool = await db[`getConn${process.env.ENV}`]()
})()

router.get('/Tracking', function (req, res) {
	if (!req.body.Datos.MensajesPrueba) return res.render('empty')
	try {
		res.render('tracking', req.body.Datos)
	} catch (err) {
		res.render('empty')
	}
})

router.post('/getTracking',async function(req,res) {
	let telefonos = req.body.telefono.split(',').filter(el=>{return !isNaN(el) && el.length === 10})
	if(telefonos.length === 0) return res.send([])
	try {
		console.log(req.body)
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
		console.log(err)
		res.send([])
	}
})

module.exports = router