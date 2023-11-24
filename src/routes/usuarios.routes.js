var express = require('express');
var router = express.Router();
const Usuarios = require('../controller/usuarios.controller')


// Registrar Usuario
router.post('/registrar', function (req, res, next) {
    Usuarios.registrar(req.body)
    .then((resultado) => {
        res.status(200).json({status: 200, mensaje: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, mensaje: error})
    })
})

// Iniciar Sesión
router.post('/login', function (req, res, next) {
    Usuarios.login(req.body)
    .then((resultado) => {
        res.status(200).json({status: 200, mensaje: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, mensaje: error})
    })
})

module.exports = router;