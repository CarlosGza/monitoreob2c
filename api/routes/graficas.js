const express = require('express')
const router = express.Router()

router.get('/Graficas', function (req, res) {
	if (!req.body.Datos.GraficaProveedor || !req.body.Datos.GraficaCliente || !req.body.Datos.GraficaDistProveedor) return res.render('empty')
	try {
		res.render('graficas', req.body.Datos)
	} catch (err) {
		res.render('empty')
	}
})

module.exports = router