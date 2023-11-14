var express = require('express');
var router = express.Router();
const Modalidades = require('../controller/modalidad.controller')

/* mostrar las modalidades */
router.get('/', function (req, res, next) {
    Modalidades.listar()
    .then((resultado) => {
        res.status(200).json({"status": 200, "data": resultado})
    })
    .catch((error) => {
        reject(error)
    })
});

/* Agregar Modalidades */
router.post('/agregar', function (req, res, next) {
    Modalidades.agregar(req.body)
    .then((resultado) => {
        res.status(200).json({status: 200, mensaje: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, mensaje: 'No se pudo agregar la modalidad', error: error})
    })
})

module.exports = router;