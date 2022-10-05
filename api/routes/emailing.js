const express = require('express')
const router = express.Router()
//const db = require('../../db/db')
/* let pool
(async ()=>{
	pool = await db[`getConn${process.env.ENV}`]()
})() */

router.get('/Emailing', function (req, res) {
	if (!req.body.Datos.MonitorEmailing || !req.body.Datos.EstatusEmailing) return res.render('empty')
	try {
		res.render('emailing', req.body.Datos)
	} catch (err) {
		res.render('empty')
	}
})

module.exports = router