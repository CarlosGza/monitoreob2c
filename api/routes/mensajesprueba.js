const express = require('express')
const router = express.Router()

router.get('/MensajesPrueba', function (req, res) {
	if (!req.body.Datos.MensajesPrueba) return res.render('empty')
	try {
		res.render('mensajesprueba', req.body.Datos)
	} catch (err) {
		res.render('empty')
	}
})

module.exports = router