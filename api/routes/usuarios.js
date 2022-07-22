const express = require('express')
const router = express.Router()

router.get('/Usuarios', function (req, res) {
	if (!req.body.Datos.Usuarios) return res.render('empty')
	try {
		res.render('usuarios', req.body.Datos)
	} catch (err) {
		res.render('empty')
	}
})

module.exports = router