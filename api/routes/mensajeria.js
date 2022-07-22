const express = require('express')
const router = express.Router()
const db = require('../../db/db')
let pool
(async ()=>{
	pool = await db[`getConn${process.env.ENV}`]()
})()

router.get(['/', '/Mensajeria'], function (req, res) {
	if (!req.body.Datos.MonitorProveedores || !req.body.Datos.MonitorNoMigrados) return res.render('empty')
	try {
		res.render('mensajeria', req.body.Datos )
	} catch (err) {
		res.render('empty')
	}
})

router.post('/updRevisadoMigrador',async function(req,res) {
	let idenviopr = req.body.idenviopr
	let revisado = req.body.revisado ? 1 : 0
	if(isNaN(idenviopr)) return res.send([])
	try {
		let results = await pool.request().query(`
		if not exists (select top 1 1 from SMSCargas.dbo.revisionalertas with(nolock) where idenviopr=${idenviopr})
			begin
				insert into SMSCargas.dbo.revisionalertas select ${idenviopr},${revisado},GETDATE()
			end
		else
			begin
				update SMSCargas.dbo.revisionalertas set Revisado = ${revisado},Fecha = GETDATE() where IdEnvioPr = ${idenviopr}
			end
		`)
		// console.log(results)
		res.send(results)
	} catch (err) {
		// console.log(err)
		res.send([])
	}
})

module.exports = router